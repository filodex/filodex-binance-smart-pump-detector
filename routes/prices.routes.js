import { request, Router } from 'express'

const router = Router()

// /api/prices/lastknown
router.get('/lastknown', (req, res) => {
    try {
        console.log('i got request')
    } catch (error) {
        res.status(500).json({ message: 'Something wrong' })
    }
})

export default router
