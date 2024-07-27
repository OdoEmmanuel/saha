import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Layout from './components/Layout'

function App() {

  return (
    <>
      {/* <Login></Login> */}

        <div className='flex '>
          <div className=''>
          <Sidebar/>  
          </div>
        
        <div className='flex-1 w-full'><Layout/></div>
        </div>
        
       
      
    </>
  )
}

export default App
