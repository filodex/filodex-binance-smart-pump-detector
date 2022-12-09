import axios from 'axios'

export const AUTH_API_URL = 'http://localhost:5000/auth'

const $api = axios.create({ withCredentials: true, baseURL: AUTH_API_URL })

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api
