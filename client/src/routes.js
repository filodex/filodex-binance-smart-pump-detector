import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { WelcomePage } from './pages/WelcomePage.tsx'
import { AuthPage } from './pages/authPage.js'

export const useRoutes = () => {
    return (
        <Routes>
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/login' element={<AuthPage />} />
            <Route path='/' element={<PricesPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

// ;<Routes>
//     <Route path='/welcome' element={<WelcomePage />} />
//     <Route path='/' element={<PricesPage />} />
//     <Route path='*' element={<Navigate to='/' />} />
// </Routes>
