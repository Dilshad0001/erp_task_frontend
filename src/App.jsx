import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import AdminUserPage from './pages/admin/AdminUserPage'
import ManagerPage from './pages/Manager/ManagerPage'
import EmployeeProfile from './pages/Employee/EmployeeProfile'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/home" element={<AdminUserPage />} />
        <Route path="/manager/home" element={<ManagerPage />} />
        <Route path="/employee/home" element={<EmployeeProfile />} />

      </Routes>
    </Router>
  )
}

export default App

