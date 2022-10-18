import pg from 'pg'
import fs from 'fs'
import { table } from 'console'

const futuresCoinsList = fs
    .readFileSync('src/Binance Futures.txt', {
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
await client.connect()

//createPostgresTable(prices, [date,BTC,ETH])
export async function createPostgresTable(tableName, columns) {
    columns = columns.map((item) => {
        return `${String(item)} varchar(50)`
    })

    return await client.query(`create table ${tableName} (${columns})`)
}

export async function writePrices(prices) {}

//console.log(await client.query(`select * from prices`))
