import React,{useState} from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import RightSide from "./RightSide";
import MobileSidebar from "./MobileSidebar";

const Layout = () => {
    const [sidebarToggle,setSidebarToggle] = useState(true)
  return (
    <div>
        {sidebarToggle && <MobileSidebar/>}
      <div className="flex ">
          <Sidebar sidebarToggle={sidebarToggle}/>
          <RightSide sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

        
      </div>
    </div>
  );
};

export default Layout;
