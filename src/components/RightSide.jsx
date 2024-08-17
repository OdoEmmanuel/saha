import {useState} from 'react'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'
import {  Routes, Route, Navigate } from 'react-router-dom';




const RightSide = ({isOpen, tog}) => {
  
  console.log(isOpen)
  return (
    <>
      
      <div className={ `${isOpen ? 'lg:ml-[6rem]':'lg:ml-[16rem]' } ml-0  w-full flex flex-col bg-[#f3f4f7] min-h-screen   `}>
      <div className=' w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      </div>
      
      <div className='p-6'>
       
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
          </Routes>
     
        
      </div>
    </div></>
  
  )
}

export default RightSide