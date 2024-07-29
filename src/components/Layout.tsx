import React from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import RightSide from "./RightSide";

const Layout = () => {
  return (
    <div>
      <div className="flex ">
        
          <Sidebar />
          <RightSide/>

        
      </div>
    </div>
  );
};

export default Layout;
