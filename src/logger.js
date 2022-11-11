import chalk from 'chalk'
import path from 'path'
import { writeFileSync, appendFileSync } from 'fs'

const _dirname = path.resolve()
const LOGS_FOLDER = path.join(_dirname, 'logs')

/**
 * @param {String} text Будет обрамлен и записан в файл
 */
export function logToFile(text) {
    const date = new Date()
    let decoratedText = `[${date.toLocaleString()}] ${text}\n`
    appendFileSync(path.join(LOGS_FOLDER, 'log.txt'), String(decoratedText))
    console.log(decoratedText)
}
