import Investment from "../src/models/Investment.js"
import Transaction from "../src/models/Transaction.js"


export const handleChargeSuccess = async ( event ) => {
    const {data} = event
    const {reference, metadata} = data
    const txType = metadata?.type

    if ( !txType ) {
        console.warn( `No metadata.type found for ${ reference }, skipping` )
        return
    }

    // Find transaction using internal ref
    const tx = await Transaction.findOne( {kingDebRef: metadata.kingDebRef} )
    if ( !tx ) {
        console.warn( `No transaction found for reference: ${ reference }` )
        return
    }

    // Duplicate webhook check
    if ( tx.status === "successful" ) {
        console.log( `Duplicate charge.success webhook for ${ reference }, ignoring.` )
        return
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
                console.log( `Investment ${ investment._id } activated` )
            }
            break
        }

        case "ecommerce": {
            tx.status = "successful"
            tx.paystackRef = reference
            await tx.save()
            console.log( `E-commerce payment successful for tx ${ tx._id }` )
            break
        }

        default:
            console.warn( `Unknown txType '${ txType }' for ${ reference }` )
    }
}

export const handleChargeFailure = async ( event ) => {
    const {data} = event
    const {reference, metadata} = data

    const tx = metadata?.kingDebRef ? await Transaction.findOne( {kingDebRef: metadata.kingDebRef} ) : null

    if ( tx ) {
        tx.status = "failed"
        await tx.save()
        console.log( `Payment failed for transaction ${ tx._id }` )
    } else {
        console.warn( `Failed charge: no transaction found for ${ reference }` )
    }
}

export const handleTransferEvent = async ( event ) => {
    const {event: eventType, data} = event
    const {reference} = data
    //we go run more stuff here soon
    if ( eventType === "transfer.success" ) {
        console.log( `Transfer succeeded for ${ reference }` )
    } else if ( eventType === "transfer.failed" ) {
        console.log( `Transfer failed for ${ reference }` )
    }
}