const UserController = {
    async registration(req, res, next) {
        try {
        } catch (error) {
            console.log(error.message)
        }
    },
    async login(req, res, next) {
        try {
        } catch (error) {
            console.log(error.message)
        }
    },
    async logout(req, res, next) {
        try {
        } catch (error) {
            console.log(error.message)
        }
    },
    async refresh(req, res, next) {
        try {
        } catch (error) {
            console.log(error.message)
        }
    },
    async getUsers(req, res, next) {
        try {
            res.json([1, 2])
        } catch (error) {
            console.log(error.message)
        }
    },
}

export default UserController
