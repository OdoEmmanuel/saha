import React from 'react'
import { MENU_ITEMS } from '../common/MenuItem'
import icon from "../assets/gti-microfinance-logo.png";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
  const toggleSubMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };
  return (
    <div className='py-4 px-6 h-screen bg-[rgb(17,24,39)] fixed  left-0 top-0 bottom-0 flex flex-col w-64 '>
       <div>
        <img src={icon}></img>
       </div>
       <div>
        {MENU_ITEMS.map((item,index) =>(
           <div key={index}></div> 
        ))}
       </div>
    </div>
  )
}

export default Sidebar