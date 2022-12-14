import userService from '../service/user.service.js'
import { validationResult } from 'express-validator'
import AuthError from '../exceptions/auth.exceptions.js'

const UserController = {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(AuthError.BadRequest('Validation failed', errors.array()))
            }

            const { login, password } = req.body
            const userData = await userService.registration(login, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            res.json(userData)
        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        console.log('ip ', req.ip)
        try {
            const { login, password } = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    },

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        } catch (error) {
            next(error)
        }
    },

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            // console.log('refresh token', refreshToken)
            const userData = await userService.refresh(refreshToken)
            // console.log('userData in controller', userData)
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    },

    async getUsers(req, res, next) {
        try {
            const allUsers = await userService.getAllUsers()
            res.json(allUsers)
        } catch (error) {
            next(error)
        }
    },
}

export default UserController
