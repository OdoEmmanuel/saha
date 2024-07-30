import React,{useState} from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import RightSide from "./RightSide";


const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(isOpen)
  return (
    <div>
        
      <div className="flex ">
          <Sidebar isOpen={isOpen} tog={toggle} />
          <RightSide isOpen={isOpen} tog={toggle} />

        
      </div>
    </div>
  );
};

export default Layout;
