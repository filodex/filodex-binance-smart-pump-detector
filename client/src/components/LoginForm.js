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

    return (
        <div>
            <input
                className='input-field'
                onChange={(e) => {
                    setLogin(e.target.value)
                    // console.log('isAuthenticated', AuthService.isAuthenticated)
                }}
                value={login}
                type='text'
                placeholder='Login'
            />
            <input
                className='input-field'
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value={password}
                type='text'
                placeholder='Password'
            />
            <button
                className='btn'
                onClick={() => {
                    AuthService.login(login, password)
                    window.location.reload()
                }}
            >
                Login
            </button>
            <button
                className='btn'
                onClick={() => {
                    AuthService.registration(login, password)
                    window.location.reload()
                }}
            >
                Registration
            </button>

            <button
                className='btn'
                onClick={() => {
                    AuthService.logout()
                    window.location.reload()
                }}
            >
                Logout
            </button>
            {AuthService?.user?.login == 'filodex' ? (
                <button
                    className='btn'
                    onClick={() => {
                        // UserService.fetchUsers().then((users) => console.log(users.data))
                    }}
                >
                    users
                </button>
            ) : (
                ''
            )}
        </div>
    )
}
