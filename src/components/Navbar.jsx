import { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import MobileSidebar from "./MobileSidebar";

const Navbar = ({isOpen,tog}) => {
//     const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
  
    

    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
  return (
    <div className="p-6  w-full    items-center ">
        {isOpen && <MobileSidebar isOpen={isOpen} tog={tog}/>}
      <div className="flex justify-between">
        <div className="text-[#fff]">
          <button onClick={tog}>
            <TfiAlignJustify />
          </button>
        </div>
        <div className="flex items-center">
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
            <div className=" text-white mr-4 flex items-center">
            <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoSunny />
                }
                {
                    !dark && <IoMoon />
                }
            </button>
        </div>
          <div className="relative">
            <button className="text-[#fff] group">
              <div className="flex items-center">
                <div>
                <span className="mr-1">USERNAME</span>
                </div>
                
                <IoChevronDown />
              </div>
              <div className="z-10 bg-[#fff]  hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0 p-4">
                <ul className="text-[#000]">
                    <li className="font-[500] mb-2 text-[15px]">Welcome!</li>
                    <li>Logout</li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
