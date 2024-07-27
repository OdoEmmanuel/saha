import React from 'react'

const Layout = () => {
  return (
    <div className='overflow-y-scroll h-screen'>
        <div className="flex flex-col w-full  items-center justify-center lg:mt-12 mt-2 mb-2  lg:mb-12">
      <div className=" text-center ">
        <h1 className=" mb-2 lg:text-[22px] text[18px] font-semibold text-[#3b0a0e]">
          RHEMA Nigeria is an outstanding Bible Training Centre with 7 campuses
          across <br/> Nigeria
        </h1>
      </div>

      <button className="text-[#fff] bg-[#3b0a0e] lg:w-[20%]  hover:bg-[#232323]  px-10 rounded py-4 shadow-md">
        APPLY NOW
      </button>
    </div>
    
    </div>
  )
}

export default Layout