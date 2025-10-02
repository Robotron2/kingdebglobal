export const calcROI = ( amount, percentage ) => {
    let roi = ( amount * percentage ) / 100
    return roi
}

export const calcMaturityDate = ( startDate, durationInDays, opts = {} ) => {
    const date = new Date( startDate )
    if ( process.env.NODE_ENV === "dev" ) {
        // treat durationInDays as minutes
        date.setMinutes( date.getMinutes() + durationInDays )
    } else {
        // normal production mode: days
        date.setDate( date.getDate() + durationInDays )
    }
    return date
}

export const roundTo2dp = ( num ) => Math.round( ( num + Number.EPSILON ) * 100 ) / 100
