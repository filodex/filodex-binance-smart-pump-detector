import jwt from 'jsonwebtoken'
import config from 'config'
import dbHandler from '../database/dbHandler.js'

class TokenService {
    /**
     * @param {{login}} payload
     * @returns {accessToken, refreshToken}
     */
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

    async removeToken(refreshToken) {
        const tokenData = dbHandler.deleteTokens(refreshToken)
        return tokenData
    }

    async validateAcceesToken(token) {
        try {
            const userData = jwt.verify(token, config.get('ACCESS_SECRET'))
            return userData
        } catch (error) {}
    }
    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.get('REFRESH_SECRET'))
            return userData
        } catch (error) {}
    }
}

export default new TokenService()
