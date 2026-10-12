import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import ParkingLoginPage from './Frontend/loginPage/loginPage'
import AdminDashboard from './Frontend/adminDashboard/adminDashboard'
import UserDashboard from './Frontend/userDashboard/userDashboard'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ParkingLoginPage />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/userDashboard' element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
