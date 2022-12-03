import userService from '../service/user.service.js'

const UserController = {
    async registration(req, res, next) {
        try {
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
        try {
        } catch (error) {
            next(error)
        }
    },

    async logout(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    },

    async refresh(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    },

    async getUsers(req, res, next) {
        try {
            res.json([1, 2])
        } catch (error) {
            next(error)
        }
    },
}

export default UserController
