export const calcROI = ( amount, percentage ) => {
    let roi = ( amount * percentage ) / 100
    return roi
}

export const calcMaturityDate = ( startDate, durationInDays ) => {
    let maturityDate = new Date( startDate + durationInDays * 24 * 60 * 60 * 1000 )
    return maturityDate
}