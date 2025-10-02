import InvestmentPlan from "../models/InvestmentPlan.js"
import Investment from "../models/Investment.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"

// CREATE
export const createPlan = catchAsync( async ( req, res, next ) => {
    const {name, description, minAmount, maxAmount, roiPercentage, durationInDays} = req.body

    if ( !name || !minAmount || !maxAmount || !roiPercentage || !durationInDays ) {
        return next( new ApiError( "Missing required fields", 400 ) )
    }

    const plan = await InvestmentPlan.create( {
        name, description, minAmount, maxAmount, roiPercentage, durationInDays
    } )

    return res.status( 201 ).json( {success: true, data: plan} )
} )

// READ
// A. List active plans (visible to all users)
export const getPlans = catchAsync( async ( req, res ) => {
    const plans = await InvestmentPlan.find( {isActive: true} ).sort( {createdAt: -1} )
    return res.json( {success: true, results: plans.length, data: plans} )
} )

// B. List active plans (visible to all users)
export const getAllPlansAdmin = catchAsync( async ( req, res ) => {
    const plans = await InvestmentPlan.find().sort( {createdAt: -1} )
    return res.json( {success: true, results: plans.length, data: plans} )
} )

// C. Fetch a single investment
export const getPlan = catchAsync( async ( req, res, next ) => {
    const plan = await InvestmentPlan.findById( req.params.id )
    if ( !plan ) return next( new ApiError( "Investment plan not found", 404 ) )
    return res.json( {success: true, data: plan} )
} )

//UPDATE
export const updatePlan = catchAsync( async ( req, res, next ) => {
    const planId = req.params.id
    const updates = req.body

    const immutableFields = ["name", "minAmount", "maxAmount", "roiPercentage", "durationInDays"]
    const safeFields = ["description", "isActive"]

    // Does this plan exist?
    const plan = await InvestmentPlan.findById( planId )
    if ( !plan ) return next( new ApiError( "Investment plan not found", 404 ) )

    // Are there any investments referencing this plan?
    const hasInvestments = await Investment.exists( {plan: planId} )

    if ( hasInvestments ) {
        // If trying to change immutable fields -> reject
        const tryingToChangeImmutable = Object.keys( updates ).some( field =>
            immutableFields.includes( field )
        )

        if ( tryingToChangeImmutable ) {
            return next(
                new ApiError(
                    "Plan cannot be modified: there are existing investments. Change only description or deactivate the plan. To change ROI/duration create a new plan.",
                    400
                )
            )
        }

        // Only apply safe fields
        const filtered = {}
        safeFields.forEach( f => {
            if ( updates[f] !== undefined ) filtered[f] = updates[f]
        } )

        const updatedPlan = await InvestmentPlan.findByIdAndUpdate( planId, filtered, {
            new: true,
            runValidators: true
        } )

        return res.json( {success: true, data: updatedPlan} )
    }

    // No investments -> allow full update
    const updatedPlan = await InvestmentPlan.findByIdAndUpdate( planId, updates, {
        new: true,
        runValidators: true
    } )

    return res.json( {success: true, data: updatedPlan} )
} )

//DELETE
// If investments exist: do not delete; set isActive = false instead
export const deletePlan = catchAsync( async ( req, res, next ) => {
    const planId = req.params.id
    const plan = await InvestmentPlan.findById( planId )
    if ( !plan ) return next( new ApiError( "Investment plan not found", 404 ) )

    const hasInvestments = await Investment.exists( {plan: planId} )

    if ( hasInvestments ) {
        // Soft-disable
        plan.isActive = false
        await plan.save()
        return res.status( 200 ).json( {
            success: true,
            message: "Plan has active investments and cannot be deleted. It has been deactivated instead.",
            data: plan
        } )
    }

    await InvestmentPlan.findByIdAndDelete( planId )
    return res.status( 204 ).send()
} )