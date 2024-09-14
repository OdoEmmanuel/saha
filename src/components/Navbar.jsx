import { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import MobileSidebar from "./MobileSidebar";
import { CiSearch } from "react-icons/ci";
import { useAuthContext } from "../common/context/useAuthContext";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Avatar.png"

const Navbar = ({ isOpen, tog }) => {
  //     const [isOpen, setIsOpen] = useState(false);
  //   const toggle = () => setIsOpen(!isOpen);
  const name = localStorage.getItem('name')
  const email = localStorage.getItem('email')
  const { headers } = useAuthContext()
  const navigate = useNavigate()


  const logout = () => {
    localStorage.clear()
    navigate('/auth/login')

  }


  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }
  return (
    <div className="p-6  w-full    sticky top-0 mb-2   items-center border-2">

      <div className="flex justify-between">

        <div className="flex items-center text-black ">
          {/* <div className="mr-1"><CiSearch size={20} /></div>
          
          <input placeholder="search " className="bg-inherit outline-none"/> */}
          <p className="lg:text-[25px] text-[12px]">{headers}</p>
        </div>
        <div className="flex items-center text-gray-400">
          {/* <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center  rounded-md   text-sm font-semibold text-[#fff] shadow-sm ">
                <span className="text-white">UserName</span>

                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-[#fff]"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute z-10 mt-2 w-56 right-[50px] origin-top-right rounded-md bg-[#1A1F25]/[90%] py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1 px-4">
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 mb-4 text-left text-sm text-[#E4ECCE] bg-[#393939] rounded-[10px] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu> */}
          {/* <div className="  mr-4 flex items-center">
            <button onClick={() => darkModeHandler()}>
              {

                dark && <IoSunny />
              }
              {
                !dark && <IoMoon />
              }
            </button>
          </div> */}
          <div className="relative mr-2">
  <button className="group relative">
    <div className="flex items-center">
      <div className="flex">
        <img src={avatar} className="mr-2" alt="Avatar" />
        <div className="flex flex-col">
          <span className="font-[500] text-[14px] text-black">{name}</span>
          <span className="font-[400] text-[12px] text-[#959595]">{email}</span>
        </div>
      </div>
    </div>
    {/* Dropdown with tooltip shape */}
    <div className="z-10 bg-white shadow-lg hidden absolute rounded-lg w-32 group-focus:block top-full right-0 mt-4 p-4">
      {/* Tooltip triangle */}
      <div className="absolute top-0 right-4 transform -translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
      </div>
      <ul>
        <li className="font-[500] mb-2 text-[15px] text-gray-600 hover:text-gray-800">Welcome!</li>
        <li className="flex items-center text-gray-500 hover:text-gray-800" onClick={() => logout()}>
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
