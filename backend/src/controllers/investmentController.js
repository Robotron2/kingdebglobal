import Investment from "../models/Investment.js"
import InvestmentPlan from "../models/InvestmentPlan.js"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"
import ApiError from "../utils/ApiError.js"
import catchAsync from "../utils/catchAsync.js"
import {calcROI, calcMaturityDate, roundTo2dp} from "../utils/investmentUtils.js"


export const createInvestment = catchAsync( async ( req, res, next ) => {
    const {planId, amount} = req.body
    const userId = req.user._id
    if ( !planId || typeof amount !== "number" ) {
        return next( new ApiError( "planId and numeric amount are required", 400 ) )
    }

    const plan = await InvestmentPlan.findById( planId )
    if ( !plan || !plan.isActive ) {
        return next( new ApiError( "Invalid or inactive investment plan", 400 ) )
    }

    if ( amount < plan.minAmount || amount > plan.maxAmount ) {
        return next(
            new ApiError( `Amount must be between ${ plan.minAmount } and ${ plan.maxAmount }`, 400 )
        )
    }

    const roiAmount = roundTo2dp( calcROI( amount, plan.roiPercentage ) )
    const startDate = new Date()
    const maturityDate = calcMaturityDate( startDate, plan.durationInDays )

    const investment = await Investment.create( {
        user: userId,
        plan: plan._id,
        amount,
        roiAmount,
        startDate,
        maturityDate,
        status: "awaiting",
        payoutStatus: "pending",
    } )

    // Create transaction placeholder (pending) for payment tracking
    await Transaction.create( {
        user: userId,
        type: "investment",
        reference: `INV-${ Date.now() }`, // will be replaced by gateway ref later
        amount,
        relatedInvestment: investment._id,
        status: "pending",
        paymentGateway: "paystack",
    } )

    return res.status( 201 ).json( {status: "success", data: investment} )
} )

export const cancelInvestment = catchAsync( async ( req, res, next ) => {
    const {investmentId} = req.params
    const userId = req.user._id

    const investment = await Investment.findById( investmentId )
    if ( !investment ) {
        return next( new ApiError( "Investment not found", 404 ) )
    }
    if ( investment.status !== "active" ) {
        return next( new ApiError( "Only active investments can be cancelled", 400 ) )
    }

    const plan = await InvestmentPlan.findById( investment.plan )
    if ( !plan ) {
        return next( new ApiError( "Plan not found", 404 ) )
    }

    const user = await User.findById( userId )
    if ( !user ) {
        return next( new ApiError( "User not found", 404 ) )
    }

    // ---------- DEV / PROD SWITCH ----------
    const dev = process.env.NODE_ENV === "dev"
    const unitMs = dev ? 1000 * 60 : 1000 * 60 * 60 * 24
    const now = Date.now()
    const start = new Date( investment.startDate ).getTime()

    const investedUnits = Math.floor( ( now - start ) / unitMs )
    const totalUnits = plan.durationInDays

    // ---------- COOL-OFF PERIOD ----------
    if ( !dev ) {
        if ( totalUnits <= 30 ) {
            return next( new ApiError( "This plan does not allow early cancellation", 400 ) )
        }
        const coolOffUnits = Math.max( 7, Math.min( 30, Math.ceil( totalUnits * 0.1 ) ) )
        if ( investedUnits < coolOffUnits ) {
            return next( new ApiError( `You can cancel this investment only after ${ coolOffUnits } days`, 400 ) )
        }
    } else {
        if ( investedUnits < 1 ) {
            return next( new ApiError( "You can cancel this test investment only after 1 minute", 400 ) )
        }
    }

    // ---------- CHECK IF ALREADY MATURED ----------
    if ( investedUnits >= totalUnits ) {
        return next( new ApiError( "Investment has matured; please request payout instead", 400 ) )
    }

    // ---------- ROI & PENALTY ----------
    const earnedROI = roundTo2dp( ( investment.roiAmount * investedUnits ) / totalUnits )

    const progress = investedUnits / totalUnits
    let penaltyRate = 0
    if ( progress < 0.25 ) penaltyRate = 0.05
    else if ( progress < 0.5 ) penaltyRate = 0.03
    else if ( progress < 0.75 ) penaltyRate = 0.02

    const penalty = roundTo2dp( investment.amount * penaltyRate )

    const refundAmount = roundTo2dp( investment.amount - penalty )
    const totalReturn = roundTo2dp( refundAmount + earnedROI )

    // ---------- UPDATE INVESTMENT ----------
    investment.status = "cancelled"
    investment.payoutStatus = "pending"
    investment._meta.cancelledBy = userId
    investment._meta.earnedROI = earnedROI
    investment._meta.refundAmount = refundAmount
    investment._meta.penalty = penalty
    await investment.save()

    // ---------- UPDATE EXISTING TRANSACTION ----------
    const tx = await Transaction.findOne( {relatedInvestment: investment._id} )
    if ( tx ) {
        tx.type = "refund"
        tx.status = "pending"
        tx.amount = totalReturn
        tx.description = `Refund from cancelling investment in ${ plan.name } plan (Penalty: ${ penalty })`
        await tx.save()
    } else {
        // fallback safety: if no transaction found, create one
        await Transaction.create( {
            user: userId,
            type: "refund",
            status: "pending",
            amount: totalReturn,
            relatedInvestment: investment._id,
            description: `Refund from cancelling investment in ${ plan.name } plan (Penalty: ${ penalty })`,
        } )
    }

    res.status( 200 ).json( {
        success: true,
        message: "Investment cancelled successfully",
        refundAmount,
        earnedROI,
        penalty,
        totalReturn,
    } )
} )

export const requestWithdrawal = catchAsync( async ( req, res, next ) => {
    const {investmentId} = req.params
    const userId = req.user._id

    // 1. Validate investment
    const investment = await Investment.findById( investmentId )
    if ( !investment ) return next( new ApiError( "Investment not found", 404 ) )
    if ( !investment.user.equals( userId ) ) return next( new ApiError( "Not your investment", 403 ) )
    if ( investment.status !== "completed" ) {
        return next( new ApiError( "Investment has not matured yet", 400 ) )
    }
    if ( investment.payoutStatus === "paid" ) {
        return next( new ApiError( "Investment already withdrawn", 400 ) )
    }
    const user = await User.findById( userId )
    if ( !user.bankAccountNumber && !bankName ) return next( new ApiError( "Please provide valid bank details", 400 ) )

    // total payout (principal + ROI)
    const totalPayout = investment.amount + investment.roiAmount

    // 2. Create transaction record
    const tx = await Transaction.create( {
        user: userId,
        type: "withdrawal",
        amount: totalPayout,
        relatedInvestment: investment._id,
        status: "pending",
        description: `Withdrawal for matured investment in plan ${ investment.plan }`
    } )

    // 3. Na here we go run Paystack Transfer. 

    //On success, else, you know what to do fam
    tx.status = "successful"
    investment.payoutStatus = "paid"
    await tx.save()
    await investment.save()

    //return something give your users chop
    return res.status( 200 ).json( {
        success: true,
        message: "Withdrawal request processed",
        data: {
            transaction: tx,
            investment
        }
    } )
} )

export const getMyInvestments = catchAsync( async ( req, res, next ) => {
    const investments = await Investment.find( {user: req.user._id} ).populate( "plan" )
    res.status( 200 ).json( {status: "success", results: investments.length, data: investments} )
} )

