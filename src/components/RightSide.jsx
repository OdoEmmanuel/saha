import {useState} from 'react'
import Navbar from './Navbar'



const RightSide = ({isOpen, tog}) => {
  console.log(isOpen)
  return (
    <>
      
      <div className='lg:ml-[16rem] ml-0  w-full flex flex-col bg-gradient-to-bl from-[#9197B3] to-white '>
      <div className='sticky w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      </div>
      
      <div></div>
    </div></>
  
  )
}

export default RightSide