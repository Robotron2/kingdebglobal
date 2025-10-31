import {handleChargeFailure, handleChargeSuccess, handleTransferEvent} from "../../helpers/paystackHelpers.js"
import catchAsync from "../utils/catchAsync.js"
import {verifyPaystackSignature} from "../utils/paystackService.js"

export const paystackWebhook = catchAsync( async ( req, res ) => {
    // 1. Verify Signature
    const isValid = verifyPaystackSignature( req )
    if ( !isValid ) {
        console.warn( "Invalid Paystack signature" )
        return res.status( 400 ).json( {success: false, message: "Invalid signature"} )
    }

    const event = req.body
    const {event: eventType, data} = event
    const {reference, status} = data || {}

    console.log( `Paystack Webhook Received: ${ eventType } | Ref: ${ reference } | Status: ${ status }` )

    //Event route by type
    switch ( eventType ) {
        case "charge.success":
            await handleChargeSuccess( event )
            break

        case "charge.failed":
        case "charge.abandoned":
            await handleChargeFailure( event )
            break

        case "transfer.success":
        case "transfer.failed":
            await handleTransferEvent( event )
            break

        default:
            console.log( `Unhandled Paystack event type: ${ eventType }` )
    }

    // 3. 200 response to Paystack
    return res.status( 200 ).json( {success: true} )
} )
