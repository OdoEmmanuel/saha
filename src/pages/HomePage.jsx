import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../common/context/useAuthContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ornament14 from '../assets/Ornament14.png'
import Ornament2 from '../assets/Ornament2.png'
import Ornament15 from '../assets/Ornament15.png'
import Ornament4 from '../assets/Ornament4.png'
import Ornament6 from '../assets/Ornament6.png'
import Ornament5 from '../assets/Ornament5.png'
import Ornament13 from '../assets/Ornament13.png'
import Ornament16 from '../assets/Ornament16.png'
import Ornament12 from '../assets/Ornament12.png'
import { IoIosPerson } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import { Settings2 } from 'lucide-react';
import { PulseLoader } from "react-spinners";
import RevenueChart from '../components/charts/RevenueChart';
import TragetChart from '../components/charts/TragetChart';
import SalesChart from '../components/charts/SalesChart';


const HomePage = () => {
    const { middleware, authorizationService, request, clientid,setHeaders } = useAuthContext()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [data, setData] = useState({})
    const [transactionStatusSummary, setTransactionSummary] = useState([])
    const [loanStatusSummary, setLoanStatusSummary] = useState([])
    const [complaintsStatusSummary,setComplaintStatusSummary] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    setHeaders('Dashboard')

    const lab = [
        'FAILED',
        'SUCCESSFUL',
        'INITIATED',
        'PENDING',
        'NULL',
        'UNKNOWN',
    ]


    useEffect(() => {

        FetchData().finally(() => isLoading(false))


    }, [startDate, endDate])

    const formatDateString = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    const requestbody = {
        startDate: startDate,
        endDate: endDate,
    }


    const FetchData = async () => {
        setisLoading(true);
        axios.post(`${middleware}dashboard/admin/report`, requestbody, config)
            .then((res) => {
                setData(res.data)
                setTransactionSummary(res.data.transactionStatusSummary.transactionStatusSummary)
                setLoanStatusSummary(res.data.loanStatusSummary.loanStatusSummary)
                setComplaintStatusSummary(res.data.complaintsStatusSummary.complaintStatusSummary)

            }).catch((e) => {
                //   console.log(e.response.data.responseMessage)

                if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (e.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(e.response.data.responseMessage)
                }
                else {
                    toast.error(e.response.data.responseMessage)
                }
            }).finally(() => {
                setisLoading(false)
                console.log(data)
            })
    }

    return (
        <div>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <h1 className='text-[30px]'>Welcome Back {name}</h1>
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
                                value={startDate}
                                onChange={(e) => formatDateString(setStartDate(e.target.value))}
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
                                value={endDate}
                                onChange={(e) => formatDateString(setEndDate(e.target.value))}
                            />
                        </div>
                    </div>
                    {/* <button
                        className=" mt-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={FetchData}
                    >
                        Fetch Data
                    </button> */}
                </div>


            </div>


            <div className='grid lg:grid-cols-4 grid-cols-2 gap-4  mt-5 '>

                <div className={` bg-[#fff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament13} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-500 text-[#fff] text-[20px] w-[30px] p-2 flex justify-center items-center  opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Customers</p>
                        <p className='text-[30px] text-[#000000] font-[500]'>{data.noOfCustomers}</p>
                    </div>
                </div>

                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament2} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-500 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total accounts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfAccounts}</p>
                    </div>
                </div>
                <div className={` bg-[#fff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament14} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Staff</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfStaff}</p>
                    </div>
                </div>
                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament5} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Loan Processed</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfLoanProcessed}</p>
                    </div>
                </div>
                <div className={` bg-[#ffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament6} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Loan PROCESSED</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfLoanApproved}</p>
                    </div>
                </div>
                <div className={` bg-[#ffffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament15} />
                    <div className='absolute top-[15%] left-[4%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500 text-[15px]'>Average Loan Turn Around Time</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.averageLoanTurnAroundTime}</p>
                    </div>
                </div>

                <div className={` bg-[#ffffff] w-[250px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[6px_8px_8px_0px_rgba(0,_0,_0,_0.25)] mr-4`}>

                    <img src={Ornament16} />
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        <div className='mb-6 bg-gray-400 w-[30px] p-2 flex justify-center items-center opacity-[.57] rounded-[5px]'>
                            <IoIosPerson />
                        </div>
                        <p className='text-gray-500'>Total Transaction Counts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.transactionCounts}</p>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5 mt-12">

                <div className='bg-[#fff]   '>
                    <TragetChart
                        className="h-full"
                        series={transactionStatusSummary.map(
                            (item) => item.transactionVolume
                        )}
                        labels={transactionStatusSummary.map(
                            (item) => item.transactionStatus
                        )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"
                    />
                </div>

                <div className='bg-[#fff] col-span-2  '>
                    <RevenueChart
                        className="h-full lg:w-full w-full"
                        series={transactionStatusSummary.map(
                            (item) => item.transactionValue
                        )}
                        labels={lab}
                        title="Transaction Status Summary By Value"
                        set={false}
                        name="Value"
                    />
                </div>


                <div className='bg-[#fff] col-span-2  '>
                    <RevenueChart
                        className="h-full lg:w-full w-full"
                        series={loanStatusSummary.map(
                            (item) => item.loanValue
                        )}
                        labels={loanStatusSummary.map((item) =>
                            item.loanStatus.replace(/_/g, ' ')
                        )}
                        title="Loan Summary By Value"
                        set={false}
                        name="Value"
                    />
                </div>

                <div className='bg-[#fff]'>
                    <TragetChart
                        className="h-full"
                        series={loanStatusSummary.map(
                            (item) => item.loanVolume
                        )}
                        labels={loanStatusSummary.map((item) =>
                            item.loanStatus.replace(/_/g, ' ')
                        )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"
                    />
                </div>

                <div className='bg-[#fff] col-span-2'>
                    <SalesChart className="h-full"
                        series={complaintsStatusSummary.map(
                            (item) => item.complainCounts
                          )}
                          labels={complaintsStatusSummary.map(
                            (item) => item.complainCounts
                          )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"
                    />
                </div>




            </div>

        </div>
    )
}

export default HomePage