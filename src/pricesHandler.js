import Api from './binanceApi.js'
import config from 'config'
import fs from 'fs'
import { writePrices } from './postgres.js'
import chalk from 'chalk'
import { EventEmitter } from 'events'

const futuresCoinsList = fs
    .readFileSync('src/Binance Futures.txt', {
        encoding: 'utf-8',
    })
    .split(',')
const { KEY, SECRET } = config.get('USER')
const api = new Api({ KEY, SECRET })

let pricesHandlerEmitter = new EventEmitter()
// [ [{},{}],[{},{}] ]
let pricesStore = []

export async function getFuturesCoinsPrices() {
    let allPrices = (await api.getAllPrices()).data
    let futuresCoinsPrices = []

    for (const iter of futuresCoinsList) {
        for (const price of allPrices) {
            if (iter == price.symbol) {
                futuresCoinsPrices.push(price)
            }
        }
    }

    return futuresCoinsPrices
}

//pricesHandler раз в минуту получит цены, запишет в тиблицу и сохранит себе, чтоб потом сравнить

export async function activatePricesWriter() {
    console.log(chalk.blueBright('interval started'))
    let oneMinuteInterval = setInterval(async () => {
        if (pricesStore.length > 20) {
            pricesStore.shift()
        }
        // prices - [{},{}]
        let prices = await getFuturesCoinsPrices()
        writePrices(prices)
        let date = new Date()
        prices.date = date
        pricesStore.push(prices)
        pricesHandlerEmitter.emit('intervalEnded', pricesStore)

        console.log(chalk.bgBlue('prices---------'), prices[0])
        console.log(chalk.blueBright('interval ended'))
    }, 60000)
    return {
        interval: oneMinuteInterval,
        pricesHandlerEmitter: pricesHandlerEmitter,
    }
}

//priceTicker == [{symbol:,price:},{}]
// return {1min:[{ticker:'',deviation:''}.{}],3min:[]}
export async function findGreatestDeviations(pricesStore_frozen) {
    if (pricesStore_frozen.length < 3) {
        console.log(
            chalk.bgBlueBright('not enough prices to compare, length=='),
            pricesStore_frozen.length
        )
        console.log(
            chalk.red('pricesStore_frozen------------'),
            pricesStore_frozen
        )
        return
    }

    let lastPrices = pricesStore_frozen[pricesStore_frozen.length - 1]
    let prev1MinPrices = pricesStore_frozen[pricesStore_frozen.length - 2]
    console.log('last prices    ------')

    let deviations_1min = []
    console.log('last prices 0!!', lastPrices[0])

    //1min
    for (const i in lastPrices) {
        let deviation = (lastPrices[i].price / prev1MinPrices[i] - 1) * 100
        deviations_1min.push({ ticker: lastPrices[i].symbol, deviation })
    }
    console.log('deviations_1min', deviations_1min)
    //(b/a-1)*100
    //pricesStore_frozen[pricesStore_frozen.length-1]
    //как то сравнить каждую цену с каждой
}
