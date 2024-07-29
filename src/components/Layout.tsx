import React from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <main className="flex flex-col ml-[16.5rem] w-full">
          <div className="sticky w-full top-0   ">
            <Navbar />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
