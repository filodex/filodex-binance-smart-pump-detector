import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import { body } from 'express-validator'

const router = new Router()

// http://localhost:5000/auth/...
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/registration', body('password').isLength({ min: 4, max: 32 }), userController.registration)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

export default router
