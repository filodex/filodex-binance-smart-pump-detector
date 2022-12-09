import AuthError from '../exceptions/auth.exceptions.js'
import tokenService from '../service/token.service.js'

export default function (req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(AuthError.UnauthorizedError())
        }

        const accessToken = authHeader.split(' ')[1]

        if (!accessToken || accessToken === 'null') {
            console.log('Error отработал')
            console.log('accessToken', accessToken)
            return next(AuthError.UnauthorizedError())
        }

        const userData = tokenService.validateAcceesToken(accessToken)
        req.user = userData
        next()
    } catch (error) {
        return next(AuthError.UnauthorizedError())
    }
}
