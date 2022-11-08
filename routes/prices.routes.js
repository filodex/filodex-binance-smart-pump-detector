import { request, Router } from 'express'
import { throwGreatestDeviations_toEndpoint } from '../app.js'

const router = Router()

// /api/prices/lastknown
router.get('/lastknown', (req, res) => {
    try {
        let greatestDeviations = throwGreatestDeviations_toEndpoint()

        res.status(200).json({
            message: 'Here it is',
            data: greatestDeviations,
            body: 'aahahah',
        })
        console.log('i got request')
    } catch (error) {
        res.status(500).json({ message: 'Something wrong' })
    }
})

export default router
