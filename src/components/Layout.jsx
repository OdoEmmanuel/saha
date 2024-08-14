import React,{useState} from "react";
import Sidebar from "./Sidebar";

import Navbar from "./Navbar";
import RightSide from "./RightSide";
import {  Routes, Route, Navigate } from 'react-router-dom';


const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(isOpen)
  return (
    <div>
        
      <div className="flex ">
          <Sidebar isOpen={isOpen} tog={toggle} />

         <Routes>
          <Route path="/*" element={<RightSide isOpen={isOpen} tog={toggle} />}></Route>
         </Routes>
           
               
          
          
          

        
      </div>
    </div>
  );
};

export default Layout;
