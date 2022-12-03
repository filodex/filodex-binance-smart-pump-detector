import express from 'express'
import { logger } from '../winston.js'

let requestsCount = 0
let requestsCountADay = 0

// On /api call
export function getStatistics(req, res, next) {
    requestsCount++
    requestsCountADay++
    // Statistics
    const apiCall = new ApiCall({
        reqDate: new Date(),
        reqId: requestsCount,
    })
    console.log(apiCall)

    next()
}

// count when midnight starts
let nowDay = new Date()
let nextDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate() + 1)
let diff = nextDay - nowDay
console.log(`timeout that starts startDayStatisticsInterval() started, new day in ${diff}`)

setTimeout(() => {
    startDayStatisticsInterval()
}, diff)

// start this at midnight
function startDayStatisticsInterval() {
    console.log(`New day started!!!`)
    logger.info(
        `New day started!!!, there were ${requestsCountADay} requests this day, and ${requestsCount} requests at all`
    )
    requestsCountADay = 0

    // once a day write requestsCountADay to file and make it 0
    let dayStatisticsInterval = setInterval(() => {
        // write to file
        console.log(`New day started!!!`)
        logger.info(
            `New day started!!!, there were ${requestsCountADay} requests this day, and ${requestsCount} requests at all`
        )
        requestsCountADay = 0
    }, 86400000) // 86400000 ms on a day
}

class ApiCall {
    constructor({ reqDate, reqId }) {
        this.reqDate = reqDate || new Date()
        this.reqId = reqId || undefined
    }
}
