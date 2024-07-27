import React from 'react'
import { MENU_ITEMS } from '../common/MenuItem'
import icon from "../assets/gti-microfinance-logo.png";

const Sidebar = () => {
  return (
    <div className='py-4 px-6 h-screen bg-[rgb(17,24,39)]  left-0 top-0 bottom-0 flex flex-col w-64 '>
       <div>
        <img src={icon}></img>
       </div>
    </div>
  )
}

export default Sidebar