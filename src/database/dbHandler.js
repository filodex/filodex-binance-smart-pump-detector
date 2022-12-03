// TODO: перенести в отдельный файл + gitignore
const users = {}

// users.log = { login: 'log', hashPassword: 'pass', tokenData: { refreshToken: undefined } }

class DbHandler {
    async findOne(login) {
        if (users[login]) {
            return users[login]
        }
        return false
    }

    async createUser({ login, hashPassword }) {
        if (users[login]) {
            throw new Error('user with this login already exists')
        }

        users[login] = new User(login, hashPassword)
        return users[login]
    }

    async refreshToken(login, token) {
        users[login].tokenData = { refreshToken: token }
    }
}

export default new DbHandler()

class User {
    constructor(login, hashPassword) {
        this.login = login
        this.hashPassword = hashPassword
        this.tokenData = {}
    }
}

// setTimeout(() => {
//     console.log(users)
// }, 1000)
