import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../common/context/useAuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoIosPerson, IoMdCalendar,IoIosPaper  } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import RevenueChart from '../components/charts/RevenueChart';
import TragetChart from '../components/charts/TragetChart';
import SalesChart from '../components/charts/SalesChart';
import Ornament14 from '../assets/Ornament14.png'
import Ornament2 from '../assets/test2.png'
import Ornament15 from '../assets/Ornament15.png'
import Ornament4 from '../assets/Ornament4.png'
import Ornament6 from '../assets/Ornament6.png'
import Ornament5 from '../assets/Ornament5.png'
import Ornament13 from '../assets/TEST1.png'
import Ornament16 from '../assets/test3.png'
import Ornament12 from '../assets/Ornament12.png'


const HomePage = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext();
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setMonth(new Date().getMonth() - 5)),
        new Date()
    ]);
    const [startDate, endDate] = dateRange;
    const [data, setData] = useState({});
    const [transactionStatusSummary, setTransactionSummary] = useState([]);
    const [loanStatusSummary, setLoanStatusSummary] = useState([]);
    const [complaintsStatusSummary, setComplaintStatusSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    setHeaders('Dashboard');

    useEffect(() => {
        if (startDate && endDate) {
            FetchData().finally(() => setIsLoading(false));
        }
    }, [dateRange]);

    const formatDateString = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function TrimText(text) {
        if (text === null) {
            return ''
        }
        const trimmedText = text.length > 10 ? text.substring(0, 10) + '...' : text
        return trimmedText
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

    const FetchData = async () => {
        setIsLoading(true);
        const requestBody = {
            startDate: formatDateString(startDate),
            endDate: formatDateString(endDate),
        };

        try {
            const res = await axios.post(`${middleware}dashboard/admin/report`, requestBody, config);
            setData(res.data);
            setTransactionSummary(res.data.transactionStatusSummary.transactionStatusSummary);
            setLoanStatusSummary(res.data.loanStatusSummary.loanStatusSummary);
            setComplaintStatusSummary(res.data.complaintsStatusSummary.complaintStatusSummary);
        } catch (e) {
            if (e.response?.data?.responseMessage === 'Invalid/Expired Token' ||
                e.response?.data?.responseMessage === 'Invalid Token' ||
                e.response?.data?.responseMessage === 'Login Token Expired') {
                toast.error(e.response.data.responseMessage);
                navigate('/auth/login');
                localStorage.clear();
            } else if (e.response?.data?.responseMessage === 'Insufficient permission') {
                toast.error(e.response.data.responseMessage);
            } else {
                toast.error(e.response?.data?.responseMessage || 'An error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const lab = [
        'FAILED',
        'SUCCESSFUL',
        'INITIATED',
        'PENDING',
        'NULL',
        'UNKNOWN',
    ]

    return (
        <div className='z-[1]'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <h1 className='text-[16px] sm:text-left xss:text-center'>Welcome Back</h1>
            <p className='text-[26px] sm:text-left xss:text-center'>{name}</p>
            <div className='flex justify-between items-center'>
                <p className='text-gray-500'>View your analytics here</p>

                <div className="lg:flex mb-5">
                    <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2">
                        <label className="text-gray-700">Date Range:</label>
                        <div className="relative flex items-center border border-gray-300 rounded px-3 py-2 bg-[#fff] hover:border-blue-500 transition-colors duration-200">
                            <IoMdCalendar className="text-gray-500 mr-2" size={20} />
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                isClearable={true}
                                placeholderText="Select date range"
                                className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 pr-8 leading-tight focus:outline-none w-48"
                            />
                              {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <IoMdCalendar className="text-gray-400" size={16} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard content */}

            <div className='sm:grid lg:grid-cols-3 sm:grid-cols-2 xss:flex flex-col items-center    mt-5 '>

                <div className={` bg-[#fff] w-[300px] h-[150px] rounded-[10px] overflow-hidden text-white relative  `}>

                    
                    <div className='absolute top-[15%] left-[8%] flex  flex-col z-[1]'>
                       
                        <p className='text-[#000000] text-[20px] font-[400]'>Total Customers</p>
                        <p className='text-[30px] text-[#000000] font-[600]'>{data.noOfCustomers}</p>
                    </div>
                    <img src={Ornament13} className='absolute right-0  bottom-0' />
                </div>

                <div className={` bg-[#ffff] w-[300px] h-[150px] rounded-[10px] overflow-hidden text-white relative  `}>

                    
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                    
                        <p className='text-[#000000] text-[20px] font-[400]'>Total accounts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfAccounts}</p>
                    </div>
                    <img src={Ornament2} className='absolute right-0  bottom-0'  />
                </div>
                
              
                

                <div className={` bg-[#ffffff] w-[300px] h-[150px] rounded-[10px] overflow-hidden text-white relative  `}>

                   
                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>
                        
                        <p className='text-[#000000] text-[20px] font-[400]'>Total Transaction Counts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.transactionCounts}</p>
                    </div>
                    <img src={Ornament16} className='absolute right-0  bottom-0' />
                </div>
            </div>


            {/* You can add RevenueChart, TragetChart, and SalesChart components here */}

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-12">

                
                    <TragetChart
                        className="h-full"
                        series={transactionStatusSummary.map(
                            (item) => item.transactionVolume
                        )}
                        series2={transactionStatusSummary.map(
                            (item) => item.transactionValue
                        )}
                        labels={transactionStatusSummary.map(
                            (item) => item.transactionStatus
                        )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"
                    />
           

                
                    <RevenueChart
                        className="h-full lg:w-full w-full"
                        series={transactionStatusSummary.map(
                            (item) => item.transactionValue
                        )}
                        series2={transactionStatusSummary.map(
                            (item) => item.transactionVolume
                        )}
                        labels={lab}
                        title="Transaction Status Summary By Value"
                        set={false}
                        name="Value"
                    />
            


                
                    <RevenueChart
                        className="h-full lg:w-full w-full"
                        series={loanStatusSummary.map(
                            (item) => item.loanValue
                        )}
                        series2={loanStatusSummary.map(
                            (item) => item.loanVolume
                        )}
                        labels={loanStatusSummary.map((item) =>
                            TrimText(item.loanStatus.replace(/_/g, ' '))

                        )}
                        title="Loan Summary By Value"
                        set={false}
                        name="Value"
                    />
            

                
                    <TragetChart
                        className="h-full"
                        series={loanStatusSummary.map(
                            (item) => item.loanVolume
                        )}
                        series2={loanStatusSummary.map(
                            (item) => item.loanValue
                        )}
                        labels={loanStatusSummary.map((item) =>
                            item.loanStatus.replace(/_/g, ' ')
                        )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"
                    />
                

                <div className='bg-[#fff] overflow-hidden rounded-lg shadow-md'>
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
    );
};

export default HomePage;