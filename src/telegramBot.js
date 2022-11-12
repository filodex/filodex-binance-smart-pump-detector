import { Telegraf, Telegram } from 'telegraf'
import config from 'config'

const chatlLink = 'https://t.me/binancePumpsAndDumpsDetector'
const chatId = '-1001822135725'
const BOT_TOKEN = config.get('BOT_TOKEN')
export const bot = new Telegraf(config.get('BOT_TOKEN'))

bot.start((ctx) => ctx.reply('Welcome'))
// bot.launch()

async function test(params) {
    console.log(await bot.telegram.sendMessage(chatId, 'hehehoho'))
}

test()
