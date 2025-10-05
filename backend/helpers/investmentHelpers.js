import Investment from "../src/models/Investment.js"
import {sendBatchMatureEmails} from "../src/utils/mailer.js"
export const investmentMaturityChecker = async () => {
    console.log( " Running investment maturity check..." )

    const now = new Date()

    // Find all matured active investments
    const investments = await Investment.find( {
        status: "active",
        maturityDate: {$lte: now},
    } ).populate( "user plan" )

    if ( !investments.length ) {
        console.log( "No investments matured at this time." )
        return
    }

    // update statuses in bulk
    for ( const inv of investments ) {
        inv.status = "completed"
        await inv.save()
    }

    // prepare email payloads
    const emailPayloads = investments.map( inv => ( {
        to: inv.user.email,
        subject: "Your Investment Has Matured",
        text: `Hi ${ inv.user.name },\n\nYour investment in the "${ inv.plan.name }" plan has matured. You can now request withdrawal or reinvest.\n\n- Amount: ₦${ inv.amount }\n- ROI: ₦${ inv.roiAmount }\n\nVisit your dashboard to take action.\n\nBest,\nYour Company`,
    } ) )

    // send in batches of 20, 3s delay (configurable)
    await sendBatchMatureEmails( emailPayloads, 20, 3000 )

    console.log( `✅ ${ investments.length } investments marked as completed & emails queued` )
}