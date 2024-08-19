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

const Navbar = ({ isOpen, tog }) => {
  //     const [isOpen, setIsOpen] = useState(false);
  //   const toggle = () => setIsOpen(!isOpen);
  const name = localStorage.getItem('name')
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
    <div className="p-6  w-full    sticky top-0 mb-8   items-center border-2">
      {isOpen && <MobileSidebar isOpen={isOpen} tog={tog} />}
      <div className="flex justify-between">

        <div className="flex items-center text-black ">
          {/* <div className="mr-1"><CiSearch size={20} /></div>
          
          <input placeholder="search " className="bg-inherit outline-none"/> */}
          <p className="text-[20px]">{headers}</p>
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
            <button className=" group">
              <div className="flex items-center">
                <div>
                  <span className="mr-1 text-black">{name}</span>
                </div>

                <IoChevronDown />
              </div>
              <div className="z-10 bg-[#fff] shadow-[8px_8px_12px_8px_rgba(0,_0,_0,_0.25)]    hidden absolute rounded-lg  w-32 group-focus:block top-full right-0 p-4">
                <ul className="">
                  <li className="font-[500] mb-2 text-[15px] text-gray-600 hover:text-gray-800">Welcome!</li>
                  <li className="flex items-center text-gray-500 hover:text-gray-800" onClick={() => logout()} >
                    <div>
                      <IoIosLogOut size={'1.5em'} className="mr-2" />
                    </div>
                    Logout
                  </li>
                </ul>
              </div>
            </button>
          </div>
          <div className="lg:hidden">
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
