import Api from './binanceApi.js'
import config from 'config'
import fs from 'fs'

const futuresCoinsList = fs
    .readFileSync('src/Binance Futures.txt', {
        encoding: 'utf-8',
    })
    .split(',')
const { KEY, SECRET } = config.get('USER')
const api = new Api({ KEY, SECRET })

async function getFuturesCoinsPrices() {
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

console.log(await getFuturesCoinsPrices())
