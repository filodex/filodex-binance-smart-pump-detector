import pg from 'pg'
import fs from 'fs'
import { table } from 'console'

//Initial
const futuresCoinsList = fs
    .readFileSync('src/BinanceFutures.txt', {
        encoding: 'utf-8',
    })
    .split(',')

const client = new pg.Client({
    user: 'filodex',
    host: 'filodex.ddns.net',
    database: 'binance-pump-detector',
    password: String(process.env.PGPASSWORD),
    port: 5432,
})

// main
try {
    await client.connect()
    console.log('client connected to postgres')
} catch (error) {
    console.log('cant connect to postgres, ', error)
}
//console.log(await client.query('select btcusdt from prices'))

// Functions
export async function customQuery(text) {
    return await client.query(text)
}

export async function endConnection() {
    client.end()
}

//createPostgresTable(prices, [BTC,ETH])
export async function createPostgresPricesTable(tableName, tickers) {
    tickers.unshift('date_ms', 'date_full')
    tickers = tickers.map((item) => {
        return `${String(item)} varchar(250)`
    })

    return await client.query(`create table ${tableName} (${tickers})`)
}
// await client.query('drop table prices')
// createPostgresPricesTable('prices', futuresCoinsList)

// prices == [{ symbol: 'ALGOUSDT', price: '0.31440000' }]
export async function writePrices(tickerPrice) {
    if (!tickerPrice) {
        throw 'no prices obj'
    }
    let date = new Date()
    let prices_price = []
    let prices_symbol = []
    for (const iter of tickerPrice) {
        prices_price.push(iter.price)
        prices_symbol.push(iter.symbol)
    }

    // await client.query('delete from prices')
    await client.query(
        `insert into prices (date_ms,date_full,${prices_symbol.toString()}) values ('${date.getTime()}','${date}',${prices_price.toString()})`
    )
    let res = await client.query('select date_ms, date_full from prices')

    // console.log(res.rows)
}
