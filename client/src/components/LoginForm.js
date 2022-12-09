import react, { useCallback, useEffect, useState } from 'react'
import AuthService from '../service/AuthService.js'
import UserService from '../service/UserService.js'

/**
 * TODO: В момент порогрузки страницы нужно выводить сообщение о том, залогинен я или нет.
 * Это зависти от наличия refresh токена в куках и его валидности
 * Нужно также менять сообщение в случае, если разлогинился или залогинился обратно
 */
export const LoginForm = (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            AuthService.refresh((bool) => {
                setIsAuthenticated(bool)
            })
        }
    }, [])

    console.log(isAuthenticated)

    return (
        <div>
            <input
                onChange={(e) => {
                    setLogin(e.target.value)
                }}
                value={login}
                type='text'
                placeholder='Login'
            />
            <input
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value={password}
                type='text'
                placeholder='Password'
            />
            <button
                onClick={() => {
                    AuthService.login(login, password)
                }}
            >
                Login
            </button>
            <button
                onClick={() => {
                    AuthService.registration(login, password)
                }}
            >
                Registration
            </button>
            <button
                onClick={() => {
                    UserService.fetchUsers().then((users) => console.log(users.data))
                }}
            >
                users
            </button>
            <button
                onClick={() => {
                    AuthService.logout()
                }}
            >
                Logout
            </button>
        </div>
    )
}
