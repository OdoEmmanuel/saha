import React,{useState} from "react";
import Sidebar from "./Sidebar";

import Navbar from "./Navbar";
import RightSide from "./RightSide";
import {  Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../common/context/useAuthContext';



const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  

  const token = localStorage.getItem('token')
 

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  console.log(isOpen)
  return (
    <div>
        
      <div className="flex w-full  ">
          <Sidebar isOpen={isOpen} tog={toggle} />

          <div className=" lg:ml-[17rem] w-full overflow-hidden">
            
         <Routes>
          <Route path="/*" element={<RightSide isOpen={isOpen} tog={toggle} />}></Route>
          
         </Routes>
          </div>

           
               
          
          
          

        
      </div>
    </div>
  );
};

export default Layout;
