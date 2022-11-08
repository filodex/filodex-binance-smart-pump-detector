import * as handler from './pricesHandler.js'

await handler.calcAtrForAllCoinsAndWriteToFile()
console.log('all arts are written to file')
