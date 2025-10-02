import InvestmentPlan from "../models/InvestmentPlan.js"
import Investment from "../models/Investment.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"

// CRUD
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