import { getFuturesCoinsPrices } from './src/pricesHandler.js'
import { writePrices } from './src/postgres.js'
import chalk from 'chalk'

process.on('uncaughtException', (err, origin) => {
    console.log(chalk.redBright(err, '----', origin))
    process.exit(1)
})

// main
await writeActualPricesToTable()

// functions
async function writeActualPricesToTable() {
    let futuresCoinsPrices = await getFuturesCoinsPrices()

    let res = await writePrices(futuresCoinsPrices)
}
