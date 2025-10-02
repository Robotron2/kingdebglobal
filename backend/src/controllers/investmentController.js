import Investment from "../models/Investment.js"
import InvestmentPlan from "../models/InvestmentPlan.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"
import {calcMaturityDate, calcROI} from "../utils/investmentUtils.js"

export const createInvestment = catchAsync( async ( req, res, next ) => {
    const {planId, amount} = req.body
    console.log( planId, "Plan id" )
    const plan = await InvestmentPlan.findById( planId )

    if ( !plan || !plan.isActive ) {
        return next( new ApiError( "Invalid or inactive investment plan", 400 ) )
    }

    if ( amount < plan.minAmount || amount > plan.maxAmount ) {
        return next( new ApiError( `Amount must be between ${ plan.minAmount } and ${ plan.maxAmount }`, 400 ) )
    }

    const roiAmount = calcROI( amount, plan.roiPercentage )
    const startDate = Date.now()
    const maturityDate = calcMaturityDate( startDate, plan.durationInDays )

    const investment = await Investment.create( {
        user: req.user._id,
        plan: plan._id,
        amount,
        roiAmount,
        startDate,
        maturityDate,
        status: "active",
        payoutStatus: "pending"
    } )

    res.status( 201 ).json( {status: "success", data: investment} )
} )

export const getMyInvestments = catchAsync( async ( req, res, next ) => {
    const investments = await Investment.find( {user: req.user._id} ).populate( "plan" )
    res.status( 200 ).json( {status: "success", results: investments.length, data: investments} )
} )

