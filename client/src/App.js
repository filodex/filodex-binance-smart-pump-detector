import React from 'react'
import M from 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage.tsx'

function App() {
    //const routes = useRoutes()

    return (
        <BrowserRouter>
            <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
            <nav>
                <div className='nav-wrapper center-on-med-and-down'>
                    <a href='#' className='brand-logo left hide-on-med-and-down-my'>
                        Patience is a virtue
                        <i className='large material-icons'>ac_unit</i>
                    </a>
                    <ul id='nav-mobile' className='right center-on-med-and-down'>
                        <li>
                            <a href='/'>Pump detector</a>
                        </li>
                        <li>
                            <a href='/countdowntimer'>Countdown</a>
                        </li>
                        <li>
                            <a href='/welcome'>Welcome</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <Routes>
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/' element={<PricesPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App

//   <div className='container'>{routes}</div>
