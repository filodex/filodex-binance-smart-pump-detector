import { Router } from 'express'

const router = new Router()

// /auth/...
router.post('/login')
router.post('/logout')
router.post('/registration')
router.post('/refresh')
router.post('/test')

export default router
