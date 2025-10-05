import Transaction from "../models/Transaction.js"
import Investment from "../models/Investment.js"
import catchAsync from "../utils/catchAsync.js"
import {verifyPaystackSignature} from "../utils/paystackService.js"

export const paystackWebhook = catchAsync( async ( req, res, next ) => {
    // 1. Verify Signature
    const isValid = verifyPaystackSignature( req )
    if ( !isValid ) {
        console.warn( "Invalid Paystack signature" )
        return res.status( 400 ).json( {success: false, message: "Invalid signature"} )
    }

    const event = req.body
    const {reference, status, metadata} = event.data
    // console.log( event.data )

    console.log( ` Paystack Webhook Received: ${ event.event } | Ref: ${ reference } | Status: ${ status }` )

    // 2. Find Transaction
    const tx = await Transaction.findOne( {kingDebRef: metadata.kingDebRef} )
    if ( !tx ) {
        console.warn( `No transaction found for reference: ${ reference }` )
        // Always return 200 so Paystack doesn't retry
        return res.status( 200 ).json( {success: true} )
    }

    // 3. Find Investment (if linked)
    const investment = tx.relatedInvestment ? await Investment.findById( tx.relatedInvestment ) : null

    // 4. Handle Payment Status
    if ( status === "success" || status === "successful" ) {
        tx.status = "successful"
        tx.paystackRef = event.data.reference
        await tx.save()

        if ( investment && investment.status === "awaiting" ) {
            investment.status = "active"
            await investment.save()
            console.log( `✅ Investment ${ investment._id } activated` )
        }
    } else if ( status === "failed" || status === "abandoned" ) {
        tx.status = "failed"
        await tx.save()
        console.log( `❌ Payment failed for transaction ${ tx._id }` )
    }

    // 5. Respond to Paystack
    return res.status( 200 ).json( {success: true} )
} )
