import jwt from 'jsonwebtoken'
import config from 'config'
import dbHandler from '../database/dbHandler.js'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get('ACCESS_SECRET'), { expiresIn: 60 * 30 })
        const refreshToken = jwt.sign(payload, config.get('REFRESH_SECRET'), { expiresIn: 60 * 60 * 24 })
        return { accessToken, refreshToken }
    }

    async saveToken(login, refreshToken) {
        const { tokenData } = await dbHandler.findOne(login)

        await dbHandler.refreshToken(login, refreshToken)
        return refreshToken
    }
}

export default new TokenService()
