import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MENU_ITEMS } from '../common/MenuItem';
import logo from '../assets/saha.png'

const MobileSidebar = ({ isOpen, tog }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const sidebarRef = useRef(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(prevOpen => prevOpen === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        tog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, tog]);

  const handleLinkClick = () => {
    tog();
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.url;
    const isParentOfActive = item.children && item.children.some(child => location.pathname === child.url);
    // if (isActive || isParentOfActive) {
    //   setLastActiveRoute(item.url);
    // }
    const activeClass = isActive || isParentOfActive ? "bg-[#007AFF26] text-[#009EDA] py-2 px-2  rounded-lg font-semibold" : 'text-[#fff] bg-[#007AFF26] rounded-lg py-2 px-2   hover:text-blue-600'
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li>
      {item.key !== 'dashboard' ? (
        <div>
          <h1 className='text-[#73809C] font-[500] text-[20px] mb-2'>{item.key}</h1>
          {item.children.map((items, index) => {
            const Open = openDropdown === items.key;
            const isActive = location.pathname === items.url;
            const isParentOfActive = items.children && items.children.some(child => location.pathname === child.url);
            // if (isActive || isParentOfActive) {
            //   setLastActiveRoute(item.url);
            // }
            const activeClass = isActive || isParentOfActive ? "bg-[#007AFF26] text-[#009EDA]  py-2 px-2  rounded-lg font-semibold" : 'text-[#fff] bg-[#007AFF26] rounded-lg py-2 px-2   '

            return (
              <li key={index} className={`mb-4 `} >
                {items.children && items.children.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(items.key)}
                      className={`flex items-center justify-between w-full  transition-colors duration-200 ${activeClass}`}
                    >
                      <span className="flex items-center">
                        {items.icon && <items.icon className="mr-2" size={18} />}
                        <div>
                          <span className={`'block mr-1 '`}>{items.label}</span>

                        </div>
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
                  <Link to={items.url} className={`flex items-center ${activeClass}  `}>
                    {items.icon && <items.icon className="mr-2" size={18} />}
                    <span className={` block mr-1`}>{items.label}</span>
                  </Link>
                )}
              </li>
            )

          })}
        </div>
      ) : (

        <Link to={item.url} className={`flex items-center ${activeClass}  `}>
          {item.icon && <item.icon className="mr-2" size={18} />}
          <span className={` block mr-1`}>{item.label}</span>
        </Link>

      )}


    </li>

    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black lg:bg-none lg:bg-opacity-0   bg-opacity-50 z-[999]" onClick={tog}></div>
      )}
      <div 
        ref={sidebarRef}
        className={`
          duration-300 sidebar h-screen bg-[#002853] overflow-auto flex flex-col leading-normal text-white w-[40%] md:w-[45%] lg:h-[100vh] px-[20px] py-[20px] fixed top-0 ${isOpen ? 'left-0' : 'left-[-100%]'} z-[1000] no-scrollbar lg:hidden
        `}
      >
        <div>
          <img src={logo} className='mb-4' alt="logo" />
        </div>
        
        <nav className="mt-5">
          <ul>
            {MENU_ITEMS.map(renderMenuItem)}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;