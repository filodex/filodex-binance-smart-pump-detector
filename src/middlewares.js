import express from 'express'

export function getStatistics(req, res, next) {
    console.log(`middleware отработал`)
    console.log(
        'res ==========================================\n',
        express.json(req)()
    )
    next()
}
