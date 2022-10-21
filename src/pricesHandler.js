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
let pricesStore = []

pricesHandlerEmitter.on('intervalEnded', (prices) => {
    console.log('emitter сработал')
})

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
    let oneMinuteInterval = setInterval(async () => {
        console.log(chalk.blueBright('interval started'))
        if (pricesStore.length > 20) {
            pricesStore.shift()
        }
        let prices = await getFuturesCoinsPrices()
        writePrices(prices)
        let date = new Date()
        prices.date = date
        pricesStore.push(prices)
        pricesHandlerEmitter.emit('intervalEnded', pricesStore)

        console.log(prices)
        console.log(chalk.blueBright('interval ended'))
    }, 60000)
    return {
        interval: oneMinuteInterval,
        pricesHandlerEmitter: pricesHandlerEmitter,
    }
}

//priceTicker == [{symbol:,price:},{}]
export async function findGreatestDeviations(pricesStore_frozen) {
    if (pricesStore_frozen.length < 3) {
        return
    }

    //как то сравнить каждую цену с каждой
}
