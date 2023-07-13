import {
    getFuturesCoinsPrices,
    activatePricesWriter,
    findGreatestDeviations,
    calcAtrForAllCoinsAndWriteToFile,
} from './src/pricesHandler.js'
import { writePrices } from './src/postgres.js'
import chalk from 'chalk'
import express from 'express'
import path, { format } from 'path'
import config from 'config'
import prices_router from './src/routes/prices.routes.js'
import authRouter from './src/routes/auth.routes.js'
import axios from 'axios'
import { EventEmitter } from 'events'
import { logToFile } from './src/logger.js'
import fs from 'fs'
import { logger } from './src/winston.js'
import { sendMessageToChannel } from './src/telegram/telegramBot.js'
import { Format } from 'telegraf'
import { getStatistics } from './src/middlewares/middlewares.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorMiddlewares from './src/middlewares/error.middlewares.js'
import authMiddleware from './src/middlewares/auth.middleware.js'

logToFile(chalk.blueBright('app.js has been started...'))

process.on('uncaughtException', (err, origin) => {
    logToFile(`uncaughtException ${err}`)
})
process.on('unhandledRejection', (err, origin) => {
    console.log('uncaughtRejection', err)
})

let greatestDeviations = []
let topPumpsAtrRelative = []
let bannedTickers = new Set()

const __dirname = path.resolve()

//express
const app = express()
const PORT = config.get('PORT') || 5000

useExpressHandlers()

/**
 * MAIN
 */
await startExpress()

// Сначала запускаю цикл, в котором получаю все цены на все фьючи раз в минуту,
// Затем каждую минуту, когда цены получены вызываю событие intervalEnded, вместе с которым получаю массив prices [[{},{}],[]]
// Этот массив имеет макс. длину 20, и сожержит массивы с ценами за каждую минуту
let pricesWriter = await activatePricesWriter() //returns event handler

pricesWriter.pricesHandlerEmitter.on('intervalEnded', async (prices) => {
    greatestDeviations = await findGreatestDeviations(prices) // просто каждую минуту обновляю greatestDeviations и затем пробрасываю в prices.routes

    let topPumpsAbsoluteMoreThanX = findTopPumpsAbsolute(greatestDeviations, 5)

    if (topPumpsAbsoluteMoreThanX[0]) {
        logger.info('sending message to Telegram with top pumps')
        sendMessageToTgAndHandleBanned(topPumpsAbsoluteMoreThanX)
    }

    // не работает
    topPumpsAtrRelative = findTopPumpsAtrRelative(greatestDeviations)
})

//calcAtrForAllCoinsAndWriteToFile() // initial
setAtrsUpdateInterval()

/**
 * Functions
 */
function findTopPumpsAbsolute(greatestDeviations, absoluteDeviation) {
    console.log('started findTopPumpsAbsolute')
    let deviationsMoreThanX = []
    for (const timeframe in greatestDeviations) {
        // 1min/3min/5min...
        for (const updown in greatestDeviations[timeframe]) {
            for (const objKey in greatestDeviations[timeframe][updown]) {
                let obj = greatestDeviations[timeframe][updown][objKey]
                if (Math.abs(obj.deviation) > absoluteDeviation) {
                    console.log(obj)
                    deviationsMoreThanX.push(obj)
                }
            }
        }
    }
    return deviationsMoreThanX
}

function findTopPumpsAtrRelative(greatestDeviations) {
    try {
        let atrRelativeGreatestDeviations = calcAtrRelativeGreatestDeviations(greatestDeviations)

        let pumps = findHighestRelDeviationsMoreThan(30, atrRelativeGreatestDeviations)
        return pumps
    } catch (error) {}
}

function sendMessageToTgAndHandleBanned(arrWithObj) {
    console.log(`Banned tickers: ${bannedTickers}`)

    let strToSend = ''
    for (const obj of arrWithObj) {
        if (isTickerBanned(obj.ticker)) {
            continue
        }

        bannedTickers.add(obj.ticker)
        console.log(`Adding ${obj.ticker} to banned`)

        setTimeoutToDeleteBannedTicker(obj.ticker)

        strToSend += `🚀 High deviation.\nticker: ${obj.ticker}, deviation: ${obj.deviation}%\n`
    }
    console.log(chalk.bgGray('strTosend is:', strToSend))
    sendMessageToChannel(strToSend)
}

function isTickerBanned(ticker) {
    if (bannedTickers.has(ticker)) {
        return true
    } else {
        return false
    }
}

function setTimeoutToDeleteBannedTicker(ticker) {
    setTimeout(() => {
        bannedTickers.delete(ticker)
    }, 1000 * 60 * 60 * 2)
}

function findHighestRelDeviationsMoreThan(x, atrRelativeGreatestDeviations) {
    let greatest = []
    for (const key in atrRelativeGreatestDeviations) {
        if (atrRelativeGreatestDeviations[key].deviationRelativeToAtr > x) {
            greatest.push(atrRelativeGreatestDeviations[key])
        }
    }
    return greatest
}

function calcAtrRelativeGreatestDeviations(greatestDeviations) {
    let atrs = JSON.parse(fs.readFileSync(path.join(path.resolve(), 'src', 'BinanceFuturesAtrs.json')))

    let generalArray = []
    for (const timeframe in greatestDeviations) {
        // 1min/3min/5min...
        for (const updown in greatestDeviations[timeframe]) {
            for (const objKey in greatestDeviations[timeframe][updown]) {
                let obj = greatestDeviations[timeframe][updown][objKey]
                let atrRelAbs = findAtr(obj.ticker, atrs)
                obj.atrAbs = atrRelAbs.atr_abs
                obj.atrRel = atrRelAbs.atr_relative
                obj.deviationRelativeToAtr = Math.abs(obj.deviation) / obj.atrRel

                generalArray.push(obj)
            }
        }
    }
    return generalArray
}

function findAtr(ticker, atrsList) {
    for (const key in atrsList) {
        if (atrsList[key].ticker === ticker) {
            return atrsList[key]
        }
    }
}

export function throwGreatestDeviations_toEndpoint() {
    return greatestDeviations
}

//do not use, prices are writing in pricesHandler
async function writeActualPricesToTable() {
    let futuresCoinsPrices = await getFuturesCoinsPrices()

    let res = await writePrices(futuresCoinsPrices)
}

async function startExpress() {
    try {
        return new Promise((res, rej) => {
            app.listen(PORT, () => {
                console.log(`Express has been started on port ${PORT}`)
                res()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

function useExpressHandlers() {
    app.use(express.json())
    app.use(cookieParser())
    // TODO change url to url from config
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
    app.use('/auth', authRouter)
    app.use('/api', getStatistics)
    app.use('/api/prices', prices_router)
    app.use('/countdowntimer', express.static(path.join(__dirname, 'client', 'src', 'pages')))
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.use(errorMiddlewares)

    app.get('/countdowntimer', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'src', 'pages', 'countdownTimer.html'))
    })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function setAtrsUpdateInterval() {
    setInterval(() => {
        calcAtrForAllCoinsAndWriteToFile()
    }, 86400000) //24hours
}
