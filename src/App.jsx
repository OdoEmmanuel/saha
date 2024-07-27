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
          
          <Sidebar/>     
    <Layout/>
        </div>
        
       
      
    </>
  )
}

export default App
