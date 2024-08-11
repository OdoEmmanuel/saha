import React from 'react'
import Ornament from '../assets/Ornament.png'
import Ornament2 from '../assets/Ornament2.png'
import Ornament3 from '../assets/Ornament3.png'
import Ornament4 from '../assets/Ornament4.png'
import { IoIosPerson } from "react-icons/io";


const HomePage = () => {
    return (
        <div>
            <h1 className='text-[30px]'>Welcome Back AYOBAMI</h1>
            <div className='flex justify-between items-center'>
                <p className='text-gray-500'>View your analytics here</p>

                <div className="lg:flex mb-5 ">
                    <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2 ">
                        <label className="text-gray-700">From:</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-[#fff]">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            <input
                                type="date"
                                className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:outline-none bg-[#fff]"
                                placeholder="Select Date"
                            //   value={startDate}
                            //   onChange={(e) => formatDateString(setStartDate(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2 ml-4">
                        <label className="text-gray-700">To:</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-[#fff]">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            <input
                                type="date"
                                className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Select Date"
                            //   value={endDate}
                            //   onChange={(e) => formatDateString(setEndDate(e.target.value))}
                            />
                        </div>
                    </div>
                    <button
                        className=" mt-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    //   onClick={FetchData}
                    >
                        Fetch Data
                    </button>
                </div>


            </div>


            <div className='grid grid-cols-4 gap-4  mt-5 '>

                <div className={` bg-[#fff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-500 text-[#fff] text-[20px] w-[30px] p-2 flex justify-center items-center  opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Customers</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>

                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament2} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-500 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total accounts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>
                <div className={` bg-[#fff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament3} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Staff</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>
                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament4} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Loan Processed</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>
                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament2} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Loan PROCESSED</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>
                <div className={` bg-[#ffffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament4} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Average Loan Turn Around Time</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>

                <div className={` bg-[#ffffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Transaction Counts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> 14</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage