import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MENU_ITEMS } from '../common/MenuItem';
import logo from '../assets/gti-microfinance-logo.png'

const Sidebar = ({isOpen,tog}) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const toggleDropdown = (key) => {
    setOpenDropdown(prevOpen => prevOpen === key ? null : key);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.url;
    const activeClass = isActive ? 'text-[#FFFFFF] p-2 rounded-[5px] bg-[#5932EA]' : 'text-[#9197B3] hover:text-blue-500';
    const hasChildren = item.children && item.children.length > 0;
    const Open = openDropdown === item.key;

    return (
      <li key={item.key} className={`${isOpen ? 'mb-6' :'mb-2'}`}>
        {hasChildren ? (
          <div>
            <button 
              onClick={() => toggleDropdown(item.key)} 
              className={`flex items-center justify-between w-full ${activeClass}`}
            >
              <span className="flex items-center">
                {item.icon && <item.icon className="mr-2" size={18} />}
                <span className={`${isOpen ? 'hidden':'block mr-1'}`}>{item.label}</span>
              </span>
              {Open ? <IoChevronUp size={16} className={`${isOpen ? 'hidden':'block'}`} /> : <IoChevronDown size={16}  className={`${isOpen ? 'hidden':'block'}`}/>}
            </button>
            {Open && (
              <ul className="ml-4 mt-2">
                {item.children.map(renderMenuItem)}
              </ul>
            )}
          </div>
        ) : (
          <Link to={item.url} className={`flex items-center ${activeClass}`}>
            {item.icon && <item.icon className="mr-2" size={18} />}
            <span className={`${isOpen ? 'hidden':'block mr-1'}`}>{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className={`${isOpen ? 'w-24 p-2':"w-64"}  bg-[#FFFFFF]  shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] h-screen overflow-y-auto fixed lg:flex flex-col items-center p-4 no-scrollbar  hidden`}>
        <div >
        <img src={logo} className='mb-4'></img>
        </div>
        
      <nav className="mt-5">
        <ul>
          {MENU_ITEMS.map(renderMenuItem)}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;