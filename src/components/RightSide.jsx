import {useState} from 'react'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'



const RightSide = ({isOpen, tog}) => {
  console.log(isOpen)
  return (
    <>
      
      <div className={ `${isOpen ? 'lg:ml-[6rem]':'lg:ml-[16rem]' } ml-0  w-full flex flex-col bg-[#f3f4f7]  h-screen`}>
      <div className='sticky w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      </div>
      
      <div className='p-6'>
        <HomePage/>
      </div>
    </div></>
  
  )
}

export default RightSide