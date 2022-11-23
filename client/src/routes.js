import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { WelcomePage } from './pages/WelcomePage.tsx'

export const useRoutes = () => {
    return (
        <Routes>
            <Route path='/prices' element={<PricesPage />} />
            <Route path='/' element={<WelcomePage />} />
        </Routes>
    )
}
