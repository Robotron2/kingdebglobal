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