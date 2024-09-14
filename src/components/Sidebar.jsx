import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MENU_ITEMS } from '../common/MenuItem';
import logo from '../assets/saha.png'

const Sidebar = ({ isOpen, tog }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastActiveRoute, setLastActiveRoute] = useState(null);



  const toggleDropdown = (key) => {
    setOpenDropdown(prevOpen => prevOpen === key ? null : key);
    console.log(key)
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.url;
    const isParentOfActive = item.children && item.children.some(child => location.pathname === child.url);
    // if (isActive || isParentOfActive) {
    //   setLastActiveRoute(item.url);
    // }
    const activeClass = isActive || isParentOfActive ? "bg-blue-100 py-2 px-2 text-blue-700 rounded-lg font-semibold" : 'text-[#fff]   hover:text-blue-600'
    const hasChildren = item.children && item.children.length > 0;
    

    



    return (
      <li>
        {item.key !== 'dashboard' ? (
          <div>
            <h1>{item.key}</h1>
            {item.children.map((items, index) => {
              const Open = openDropdown === items.key;
              
              return (
                <li key={index} className={`mb-4 `} >
                  {items.children && items.children.length > 0 ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(items.key)}
                        className={`flex items-center justify-between w-full px-4  rounded-lg transition-colors duration-200 ${activeClass}`}
                      >
                        <span className="flex items-center">
                          {items.icon && <items.icon className="mr-2" size={18} />}
                          <span className={`  'block mr-1 '`}>{items.label}</span>
                        </span>
                        {Open ? <IoChevronUp size={16} className={`  block}`} /> : <IoChevronDown size={16} className={` block`} />}
                      </button>
                      {/* {Open && (
                      <ul className="ml-10 mt-2">
                        {item.children.map(renderMenuItem)}
                      </ul>
                    )} */}
                      {Open && (
                        <ul className="mt-1 ml-12 space-y-1">
                          {items.children.map(child => {
                            const isChildActive = location.pathname === child.url;
                            const childActiveClass = isChildActive ? " text-blue-700 font-semibold" : 'text-[#fff]  hover:text-blue-600';
                            return (
                              <li key={child.key}>
                                <Link to={child.url} className={`flex items-center mb-2 ${childActiveClass}`}>
                                  {child.icon && <child.icon className="mr-2" size={18} />}
                                  <span className={` block mr-1 text-black-400`}>{child.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link to={items.url} className={`flex items-center ${activeClass} px-4 `}>
                      {items.icon && <items.icon className="mr-2" size={18} />}
                      <span className={` block mr-1`}>{items.label}</span>
                    </Link>
                  )}
                </li>
              )

            })}
          </div>
        ) : (

          <Link to={item.url} className={`flex items-center ${activeClass} px-4 `}>
            {item.icon && <item.icon className="mr-2" size={18} />}
            <span className={` block mr-1`}>{item.label}</span>
          </Link>

        )}


      </li>
    );
  };

  return (
    <div className={` w-64  bg-[#002853]   h-screen overflow-y-auto fixed lg:flex flex-col  shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]   no-scrollbar   hidden`}>

      <div className='px-4 pt-2' >
        <img src={logo} className='mb-4 w-[150px] '></img>
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