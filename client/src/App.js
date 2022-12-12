import React, { useState } from 'react'
import M from 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { PricesPage } from './pages/PricesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage.tsx'
import { Navbar } from './components/Navbar.js'
import AuthService from './service/AuthService'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
            {useRoutes()}
        </BrowserRouter>
    )
}
export default App
