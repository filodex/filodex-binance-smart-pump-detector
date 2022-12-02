import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = new Router()

// /auth/...
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/registration', userController.registration)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

export default router
