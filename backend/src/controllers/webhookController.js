import Transaction from "../models/Transaction.js"
import Investment from "../models/Investment.js"
import catchAsync from "../utils/catchAsync.js"
import {verifyPaystackSignature} from "../utils/paystackService.js"

export const paystackWebhook = catchAsync( async ( req, res, next ) => {
    // 1. Verify Signature
    const isValid = verifyPaystackSignature( req )
    if ( !isValid ) {
        console.warn( " Invalid Paystack signature" )
        return res.status( 400 ).json( {success: false, message: "Invalid signature"} )
    }

    const event = req.body
    const {reference, status, metadata} = event.data
    const eventType = event.event

    console.log( ` Paystack Webhook Received: ${ eventType } | Ref: ${ reference } | Status: ${ status }` )

    // Defensive: metadata might not exist (e.g. some transfer events)
    const txType = metadata?.type

    // 2. Route by event type
    switch ( eventType ) {
        case "charge.success": {
            if ( !txType ) {
                console.warn( ` No metadata.type found for ${ reference }, skipping` )
                break
            }

            // Find the transaction using internal reference stored in metadata
            const tx = await Transaction.findOne( {kingDebRef: metadata.kingDebRef} )
            if ( !tx ) {
                console.warn( ` No transaction found for reference: ${ reference }` )
                // Always respond 200 to avoid Paystack retries
                break
            }

            // Duplicate webhook check
            if ( tx.status === "successful" ) {
                console.log( ` Duplicate charge.success webhook for ${ reference }, ignoring.` )
                break
            }

            switch ( txType ) {
                case "investment": {
                    tx.status = "successful"
                    tx.paystackRef = reference
                    await tx.save()

                    const investment = tx.relatedInvestment
                        ? await Investment.findById( tx.relatedInvestment )
                        : null

                    if ( investment && investment.status === "awaiting" ) {
                        investment.status = "active"
                        await investment.save()
                        console.log( ` Investment ${ investment._id } activated` )
                    }
                    break
                }

                case "ecommerce": {
                    //  Future e-commerce logic goes here
                    // mark order as paid, send confirmation email, etc.
                    tx.status = "successful"
                    tx.paystackRef = reference
                    await tx.save()

                    console.log( ` E-commerce payment successful for tx ${ tx._id }` )
                    break
                }

                default:
                    console.warn( ` Unknown txType '${ txType }' for ${ reference }` )
            }

            break
        }

        case "charge.failed":
        case "charge.abandoned": {
            // Handle failed payments
            const tx = metadata?.kingDebRef
                ? await Transaction.findOne( {kingDebRef: metadata.kingDebRef} )
                : null

            if ( tx ) {
                tx.status = "failed"
                await tx.save()
                console.log( ` Payment failed for transaction ${ tx._id }` )
            }
            break
        }

        case "transfer.success":
            // Handle transfers (e.g. withdrawals, payouts)
            console.log( ` Transfer succeeded for ${ reference }` )
            break

        case "transfer.failed":
            console.log( ` Transfer failed for ${ reference }` )
            break

        default:
            console.log( `ℹ Unhandled Paystack event type: ${ eventType }` )
    }

    // 3. Always respond 200 to acknowledge receipt to Paystack
    return res.status( 200 ).json( {success: true} )
} )



// {
//     event: 'charge.success',
//     data: {
//       id: 5402471679,
//       domain: 'test',
//       status: 'success',
//       reference: 'zpb33hfesq',
//       amount: 150000,
//       message: null,
//       gateway_response: 'Successful',
//       paid_at: '2025-10-05T15:50:55.000Z',
//       created_at: '2025-10-05T15:49:19.000Z',
//       channel: 'card',
//       currency: 'NGN',
//       ip_address: '102.89.68.231',
//       metadata: {
//         type: 'investment',
//         planId: '68deaa1abf37929389fbe377',
//         userId: '68dd000404d2c718e0aa7a22',
//         kingDebRef: 'KDG - NRODZ8'
//       },
//       fees_breakdown: null,
//       log: null,
//       fees: 2250,
//       fees_split: null,
//       authorization: {
//         authorization_code: 'AUTH_0opujao8g6',
//         bin: '408408',
//         last4: '4081',
//         exp_month: '12',
//         exp_year: '2030',
//         channel: 'card',
//         card_type: 'visa ',
//         bank: 'TEST BANK',
//         country_code: 'NG',
//         brand: 'visa',
//         reusable: true,
//         signature: 'SIG_mSmMjSCmGtJwuHBvH84A',
//         account_name: null,
//         receiver_bank_account_number: null,
//         receiver_bank: null
//       },
//       customer: {
//         id: 310285760,
//         first_name: null,
//         last_name: null,
//         email: 'email@email.com',
//         customer_code: 'CUS_pm8pl7qj7e4qu3v',
//         phone: null,
//         metadata: null,
//         risk_action: 'default',
//         international_format_phone: null
//       },
//       plan: {},
//       subaccount: {},
//       split: {},
//       order_id: null,
//       paidAt: '2025-10-05T15:50:55.000Z',
//       requested_amount: 150000,
//       pos_transaction_data: null,
//       source: {
//         type: 'api',
//         source: 'merchant_api',
//         entry_point: 'transaction_initialize',
//         identifier: null
//       }
//     }
//   }
