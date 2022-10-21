import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage'

function App() {
    //const routes = useRoutes()
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/prices' element={<PricesPage />} />
                <Route path='/' element={<WelcomePage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App

//   <div className='container'>{routes}</div>
