import dbHandler from '../database/dbHandler.js'
import bcrypt from 'bcrypt'
import tokenService from './token.service.js'

class UserService {
    async registration(login, password) {
        const candidate = await dbHandler.findOne(login)
        if (candidate) {
            throw new Error(`User with '${login}' login already exist`)
        }

        const hashPassword = await bcrypt.hash(String(password), 3)
        await dbHandler.createUser({ login, hashPassword })
        const tokens = tokenService.generateTokens({ login })
        await tokenService.saveToken(login, tokens.refreshToken)

        return { login, tokens }
    }
}

export default new UserService()

async function testDb() {
    const user = await dbHandler.createUser({ login: '211', hashPassword: '1231' })
    // console.log(user)
    // const user2 = await dbHandler.createUser({ login: '211', hashPassword: '1231' })

    let tokens = tokenService.generateTokens({ data: new Date() })
    console.log(tokens)

    dbHandler.refreshToken('211', tokens.refreshToken)
    const userUpdated = await dbHandler.findOne('211')
    console.log(userUpdated)
}

// testDb()

async function testUserService() {
    const userService = new UserService()
    const user = await userService.registration('filodex', 9609)

    console.log(user)

    const user2 = await userService.registration('filodexisa', 20023)
    console.log(user2)
}
