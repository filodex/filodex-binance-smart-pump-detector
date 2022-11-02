console.log(chalk.blueBright('app.js has been started...'))

import {
    getFuturesCoinsPrices,
    activatePricesWriter,
    findGreatestDeviations,
} from './src/pricesHandler.js'
import { writePrices } from './src/postgres.js'
import chalk from 'chalk'
import express from 'express'
import path from 'path'
import config from 'config'
import prices_router from './routes/prices.routes.js'
import axios from 'axios'
import { EventEmitter } from 'events'

process.on('uncaughtException', (err, origin) => {
    console.log(chalk.redBright(err, '----', origin))
    process.exit(1)
})

let greatestDeviations = []
const __dirname = path.resolve()

//express
const app = express()
const PORT = config.get('PORT') || 5000
app.use('/api/prices', prices_router)
app.use(
    '/countdowntimer',
    express.static(path.join(__dirname, 'client', 'src', 'pages'))
)
app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('/countdowntimer', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'src', 'pages', 'countdownTimer.html')
    )
})
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// main
await startExpress()

// Сначала запускаю цикл, в котором получаю все цены на все фьючи раз в минуту,
// Затем каждую минуту, когда цены получены вызываю событие intervalEnded, вместе с которым получаю массив prices [[{},{}],[]]
// Этот массив имеет макс. длину 20, и сожержит массивы с ценами за каждую минуту
let pricesWriter = await activatePricesWriter()
pricesWriter.pricesHandlerEmitter.on('intervalEnded', async (prices) => {
    greatestDeviations = await findGreatestDeviations(prices)
    //console.log('greatest deviations in app.js', greatestDeviations)
})

export function getGreatestDeviations_toEndpoint() {
    return greatestDeviations
}

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
