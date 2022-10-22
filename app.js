console.log(chalk.blueBright('app.js has been started...'))

import {
    getFuturesCoinsPrices,
    activatePricesWriter,
    findGreatestDeviations,
} from './src/pricesHandler.js'
import { writePrices } from './src/postgres.js'
import chalk from 'chalk'
import express from 'express'
import config from 'config'
import prices_router from './routes/prices.routes.js'
import axios from 'axios'
import { EventEmitter } from 'events'

process.on('uncaughtException', (err, origin) => {
    console.log(chalk.redBright(err, '----', origin))
    process.exit(1)
})

//express
const app = express()
const PORT = config.get('PORT') || 5000
app.use('/api/prices', prices_router)

// main
//await startExpress()

let pricesWriter = await activatePricesWriter()
pricesWriter.pricesHandlerEmitter.on('intervalEnded', async (prices) => {
    let greatestDeviations = await findGreatestDeviations(prices)
})

//axios.get('http://127.0.0.1:5000/api/prices/lastknown', {})

// functions

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
