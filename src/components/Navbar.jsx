import React from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";
import { useAuthContext } from "../common/context/useAuthContext";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Avatar.png";

const Navbar = ({ isOpen, tog }) => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const { headers } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <div className="p-6 w-full sticky top-0 mb-2 items-center border-2 bg-white ">
      <div className="flex justify-between">
        <div className="flex items-center text-black">
          <p className="lg:text-[25px] text-[20px] capitalize font-[700]">{headers}</p>
        </div>
        <div className="flex items-center text-gray-400">
          <div className="relative mr-2">
            <button className="group relative">
              <div className="flex items-center">
                <div className="flex">
                  <img src={avatar} className="mr-2" alt="Avatar" />
                  <div className="sm:flex hidden flex-col">
                    <span className="font-[500] text-[14px] text-black">{name}</span>
                    <span className="font-[400] text-[12px] text-[#959595]">{email}</span>
                  </div>
                </div>
              </div>
              {/* Dropdown with tooltip shape */}
              <div className="bg-white shadow-lg hidden absolute rounded-lg w-32 group-focus:block top-full right-0 mt-4 p-4 z-[60]">
                {/* Tooltip triangle */}
                <div className="absolute top-0 right-4 transform -translate-y-full">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                </div>
                <ul>
                  <li className="font-[500] mb-2 text-[15px] text-gray-600 hover:text-gray-800">Welcome!</li>
                  <li className="flex items-center text-gray-500 hover:text-gray-800 cursor-pointer" onClick={logout}>
                    <div>
                      <IoIosLogOut size={'1.5em'} className="mr-2" />
                    </div>
                    Logout
                  </li>
                </ul>
              </div>
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={tog}>
              <TfiAlignJustify />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;