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

export const generateInternalReference = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for ( let i = 0;i < 6;i++ ) {
        code += chars.charAt( Math.floor( Math.random() * chars.length ) )
    }
    return `KDG - ${ code }`
}


export const roundTo2dp = ( num ) => Math.round( ( num + Number.EPSILON ) * 100 ) / 100
