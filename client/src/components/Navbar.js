import react, { useState } from 'react'
import AuthService from '../service/AuthService.js'

export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    AuthService.refresh()
        .then((res) => {
            setIsAuthenticated(res)
        })
        .catch((err) => {
            setIsAuthenticated(false)
        })

    if (isAuthenticated == null) {
        return <div> LOADING</div>
    }
    return (
        <nav>
            <div className='nav-wrapper center-on-med-and-down'>
                <a href='#' className='brand-logo left hide-on-med-and-down-my'>
                    Patience is a virtue
                    <i className='large material-icons'>ac_unit</i>
                </a>
                <ul id='nav-mobile' className='right center-on-med-and-down'>
                    <li>
                        <a href='/welcome'>Welcome</a>
                    </li>
                    <li>
                        <a href='/'>Pump detector</a>
                    </li>
                    <li>
                        <a href='/countdowntimer'>Countdown</a>
                    </li>
                    {/* <li>
                        {isAuthenticated ? (
                            <a href='/login'>{AuthService.user.login}</a>
                        ) : (
                            <a href='/login'>Login</a>
                        )}
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
