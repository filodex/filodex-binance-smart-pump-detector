import axiosAuth, { AUTH_API_URL } from '../hooks/axios.hook.js'
import axios from 'axios'

export default class AuthService {
    static isAuthenticated = false
    static user

    static async login(login, password) {
        const res = axiosAuth.post('/login', { login, password })
        res.then((res) => {
            if (res.statusText == 'OK') {
                AuthService.user = res.data
                AuthService.isAuthenticated = true
                localStorage.setItem('token', JSON.stringify(res.data.tokens.accessToken))
            }
            console.log(res)
        })
        return res
    }

    static async registration(login, password) {
        const res = axiosAuth.post('/registration', { login, password })
        res.then((res) => {
            if (res.statusText == 'OK') {
                AuthService.user = res.data
                AuthService.isAuthenticated = true
                localStorage.setItem('token', JSON.stringify(res.data.tokens.accessToken))
            }
            console.log(res)
        })
        return res
    }

    static async logout() {
        AuthService.user = undefined
        localStorage.removeItem('token')
        return axiosAuth.post('/logout')
    }

    static async refresh() {
        const res = await axios.get(AUTH_API_URL + '/refresh', { withCredentials: true })
        console.log('refresh()', res)
        if (res.statusText == 'OK') {
            AuthService.user = res.data
            AuthService.isAuthenticated = true
            localStorage.setItem('token', JSON.stringify(res.data.tokens.accessToken))
            return true
        } else {
            return false
        }
    }
}
