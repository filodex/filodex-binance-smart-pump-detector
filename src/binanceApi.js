import axios from 'axios'
import chalk from 'chalk'
import hash from 'hash.js'

const API_URL = 'https://api.binance.com'

/**API-keys are passed into the Rest API via the X-MBX-APIKEY header.*/
const KEY = ''
const HEADERS = { 'X-MBX-APIKEY': KEY }

/**
 * @param {KEY} opt
 */
export default function Api(opt) {
    if (!opt) {
        console.log(chalk.redBright('Не переданы настройки'))
        throw 'Не переданы настройки'
    }
    this.KEY = opt.KEY
    this.SECRET = opt.SECRET
    HEADERS['X-MBX-APIKEY'] = this.KEY
    if (!this.KEY) {
        console.log(chalk.redBright('Не передан ключ'))
        throw 'Не передан ключ'
    }

    this.checkPing = async () => {
        const url = API_URL + '/api/v3/ping'
        let res = await axios({ method: 'GET', url })
        return res
    }
    this.getServerTime = async () => {
        const url = API_URL + '/api/v3/time'
        let res = await axios({ method: 'GET', url })
        return res
    }
    this.getBTCOrderBook = async ({ symbol = 'BTCUSDT', limit = 100 } = {}) => {
        const url = API_URL + `/api/v3/depth?symbol=${symbol}&limit=${limit}`
        let res = await axios({ method: 'GET', url })
        return res
    }
    this.getAccountInfo = async () => {
        const url_unsigned =
            API_URL +
            `/api/v3/account?recvWindow=5000&timestamp=${await (
                await this.getServerTime()
            ).data.serverTime}`

        const url = `${url_unsigned}&signature=${createSignature(
            url_unsigned,
            this.SECRET
        )}`

        let res = await axios({ method: 'GET', url, headers: HEADERS })
        return res
    }
    this.getAccountSnapshot = async () => {
        let url =
            API_URL +
            `/sapi/v1/accountSnapshot?type=SPOT&timestamp=${await createTimeStamp(
                this
            )}`
        const signature = createSignature(url, this.SECRET)
        url = url + `&signature=${signature}`
        let res = await axios({ method: 'GET', url, headers: HEADERS })
        return res
    }
    this.getFundingAccountSnapshot = async () => {
        let url =
            API_URL +
            `/sapi/v1/asset/get-funding-asset?needBtcValuation=true&timestamp=${await createTimeStamp(
                this
            )}`
        const signature = createSignature(url, this.SECRET)
        url = url + `&signature=${signature}`

        let res = await axios({
            method: 'POST',
            url,
            headers: HEADERS,
            data: '',
        })
        return res
    }
    this.getExchangeInfo = async () => {
        let url = API_URL + '/api/v3/exchangeInfo'

        let res = await axios({ method: 'GET', url, headers: HEADERS })
        return res
    }
    this.getAllPrices = async () => {
        let url = API_URL + '/api/v3/ticker/price'
        let res = await axios({ method: 'GET', url, headers: HEADERS })
        return res
    }
    this.getCandles = async ({
        symbol = 'BTCUSDT',
        interval = '1m',
        startTime,
        endTime,
        limit = 500,
    }) => {
        // [0] - ранняя дата [499] - поздняя дата
        let url = API_URL + '/api/v3/klines'
        url += `?symbol=${symbol}&interval=${interval}&limit=${limit}`
        let res = await axios({ method: 'GET', url, headers: HEADERS })
        return res
    }
}

function createSignature(url, secret) {
    if (!url || !secret) {
        console.log('Не передан один из параметров!')
    }
    url = url.split('?')[1]

    const signature = hash.hmac(hash.sha256, secret).update(url).digest('hex')

    return signature
}

// Принимает объект API
async function createTimeStamp(obj) {
    return (await obj.getServerTime()).data.serverTime
}
