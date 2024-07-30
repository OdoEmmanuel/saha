import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import RightSide from './components/RightSide'
import Layout from './components/Layout'

function App() {

  return (
    <>
      {/* <Login></Login> */}
{/* 
        <div className='flex '>
          
          <Sidebar/>
          <RightSide/>     
    
        </div> */}
        <Layout/>
       
      
    </>
  )
}

export default App
