import React from 'react'
import M from 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage'

function App() {
    //const routes = useRoutes()

    return (
        <BrowserRouter>
            <nav>
                <div className='nav-wrapper'>
                    <a href='#' className='brand-logo left'>
                        Patience is a virtue
                    </a>
                    <ul id='nav-mobile' className='right'>
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
