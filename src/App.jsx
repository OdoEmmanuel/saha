import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import RightSide from './components/RightSide'
import Layout from './components/Layout'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Otp from './pages/Otp'
import ForgetPassword from './pages/ForgetPassword'
import AutoLogout from './pages/AutoLogout'

function App() {

  return (

    <>
      <AutoLogout timeoutMinutes={60} />
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/recover-password" element={<Otp />} />
        <Route path="/auth/reset-password" element={<ForgetPassword />} />
        <Route path="/*" element={<Layout />} />
      </Routes>


    </>
  )
}

export default App
