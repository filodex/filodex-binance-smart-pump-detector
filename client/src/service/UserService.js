import $api from '../hooks/axios.hook.js'

export default class UserService {
    static async fetchUsers() {
        return $api.get('/users')
    }
}
