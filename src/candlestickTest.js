import Api from './binanceApi.js'
import config from 'config'
import chalk from 'chalk'

const { KEY, SECRET } = config.get('USER')
const api = new Api({ KEY, SECRET })

console.log(chalk.bgBlue('Start...'))

api.getCandles({}).then((res) => {
    console.log(res.data[0], res.data[499])
})
