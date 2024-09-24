import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../common/context/useAuthContext';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoIosPerson, IoMdCalendar, IoIosPaper } from "react-icons/io";
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
import { UilEllipsisV } from '@iconscout/react-unicons';
import Dropdown from '../components/charts/Dropdown';
import CustomToggle from '../components/CustomSwitch';


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
    const [showTransactionChart, setShowTransactionChart] = useState(true);
    const [showLoanChart, setShowLoanChart] = useState(true);
    const [customers, setCustomers] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [pagesize, SetPageSize] = useState(10)
    const [Element, SetElement] = useState(0)
    setHeaders('Dashboard');


    const handleTransactionToggle = (isChecked) => {
        setShowTransactionChart(!isChecked);
    };

    const handleLoanToggle = (isChecked) => {
        setShowLoanChart(!isChecked);
    };

    useEffect(() => {
        if (startDate && endDate) {
            FetchData().finally(() => setIsLoading(false));
        }
        fetchCustomer()
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


    const fetchCustomer = () => {
        axios.get(`${middleware}user/allUsers?pageNumber=${pageNumber}&pageSize=${pagesize}`, config)
            .then((res) => {
                console.log(res.data.data.users.content)
                setCustomers(res.data.data.users.content)
                SetElement(res.data.data.users.totalElements)

            }).catch((e) => {
                console.log(e.response.data.responseMessage)

                if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (e.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/')
                }
                else {
                    toast.error(e.response.data.responseMessage)
                }
            }).finally(() => {
                setIsLoading(false)
            })
    }

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

            <div className='sm:grid lg:grid-cols-3 sm:grid-cols-3 gap-4 xss:flex flex-col items-center    mt-5 '>

                <div className={` bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)]  text-white relative  `}>


                    <div className='absolute top-[15%] left-[8%] flex  flex-col z-[1]'>

                        <p className='text-[#000000] text-[20px] font-[400]'>Total Customers</p>
                        <p className='text-[30px] text-[#000000] font-[600]'>{data.noOfCustomers}</p>
                    </div>
                    <img src={Ornament13} className='absolute right-0  bottom-0' />
                </div>

                <div className={` bg-[#ffff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)]   `}>


                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>

                        <p className='text-[#000000] text-[20px] font-[400]'>Total accounts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.noOfAccounts}</p>
                    </div>
                    <img src={Ornament2} className='absolute right-0  bottom-0' />
                </div>




                <div className={` bg-[#ffffff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden text-white relative shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)]   `}>


                    <div className='absolute top-[15%] left-[8%] flex  flex-col'>

                        <p className='text-[#000000] text-[20px] font-[400]'>Total Transaction Counts</p>
                        <p className='text-[30px] text-[#000000] font-[500]'> {data.transactionCounts}</p>
                    </div>
                    <img src={Ornament16} className='absolute right-0  bottom-0' />
                </div>
            </div>


            {/* You can add RevenueChart, TragetChart, and SalesChart components here */}

            <div className="grid lg:grid-cols-3 grid-cols-2   gap-x-5 gap-y-4 mt-16">

                {/* <div className="bg-white rounded-lg shadow-md overflow-hidden w-full h-full ">
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-semibold text-gray-800 uppercase">Transaction Status Summary By Volume</h5>
                            <div className="h-8">
                                <Dropdown />
                            </div>
                        </div>
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
                    </div>
                </div> */}

                <div className="bg-white rounded-lg shadow-md overflow-hidden col-span-2   w-full">
                    <div className="overflow-hidden p-2">
                        <div className="flex i justify-between  overflow-hidden">
                            <h5 className="text-[15px] font-semibold text-gray-800 uppercase">
                                {showTransactionChart ? "Transaction Status Summary By Value" : "Loan Summary By Value"}
                            </h5>
                            <CustomToggle
                                onToggle={handleTransactionToggle}
                                label1="Transaction"
                                label2="Loan"
                            />
                        </div>
                        <RevenueChart
                            className=""
                            series={showTransactionChart
                                ? transactionStatusSummary.map((item) => item.transactionValue)
                                : loanStatusSummary.map((item) => item.loanValue)
                            }
                            series2={showTransactionChart
                                ? transactionStatusSummary.map((item) => item.transactionVolume)
                                : loanStatusSummary.map((item) => item.loanVolume)
                            }
                            labels={showTransactionChart
                                ? lab
                                : loanStatusSummary.map((item) => TrimText(item.loanStatus.replace(/_/g, ' ')))
                            }
                            title={showTransactionChart ? "Transaction Status Summary By Value" : "Loan Summary By Value"}
                            set={false}
                            name="Value"
                        />
                    </div>
                </div>

                <div className="rounded-lg shadow-md p-6 flex flex-col justify-between row-span-2 items-start bg-[#fff] flex-1 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-[1.125rem] font-semibold">Customer</h1>

                        <div className="flex gap-x-3">
                            <h1 className="text-[1.125rem] font-normal">Total:</h1>
                            <p className="text-[1.125rem] font-bold">{Element}</p>
                        </div>
                    </div>

                    <div className="w-full h-full">
                        <table className="w-full h-full">
                            <thead className="bg-gray-100">
                                <tr className="border-b">
                                    <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">
                                        #
                                    </th>
                                    <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">
                                        First Name
                                    </th>
                                    <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">
                                        Last Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((data, index) => (
                                    <tr className="border-b" key={index}>
                                        <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                                            {data.firstName}
                                        </td>
                                        <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                                            {data.lastName}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Link
                        to="/ui/customer/customer-date"
                        className="py-2 text-white font-light tracking-wide bg-[#072D56] rounded-md px-4"
                    >
                        View More
                    </Link>

                </div>

                <div className='bg-[#fff] overflow-hidden  rounded-lg shadow-md'>
                    <SalesChart 
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




                <div className="bg-white rounded-lg shadow-md overflow-hidden  w-full h-full ">
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-[15px] font-semibold text-gray-800 uppercase">
                                {showLoanChart ? "Transaction Status Summary By Volume" : "Loan Summary By Volume"}
                            </h5>
                            <CustomToggle
                                onToggle={handleLoanToggle}
                                label1="Transaction"
                                label2="Loan"
                            />
                        </div>
                        <TragetChart
                            className="h-full"
                            series={showLoanChart
                                ? transactionStatusSummary.map((item) => item.transactionVolume)
                                : loanStatusSummary.map((item) => item.loanVolume)
                            }
                            series2={showLoanChart
                                ? transactionStatusSummary.map((item) => item.transactionValue)
                                : loanStatusSummary.map((item) => item.loanValue)
                            }
                            labels={showLoanChart
                                ? transactionStatusSummary.map((item) => item.transactionStatus)
                                : loanStatusSummary.map((item) => item.loanStatus.replace(/_/g, ' '))
                            }
                            title={showLoanChart ? "Transaction Status Summary By Volume" : "Loan Summary By Volume"}
                            name="Volume"
                        />
                    </div>
                </div>














                {/* <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-full">
                    <div className="overflow-hidden p-6">
                        <div className="flex items-center justify-between pb-4 overflow-hidden">
                            <h5 className="text-xl font-semibold text-gray-800 uppercase">Transaction Status Summary By Value</h5>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <UilEllipsisV size={20} />
                                </button>

                                <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    {['Today', '7 Days', '15 Days', '1 Month', '6 Months', '1 Year'].map((period) => (
                                        <Link
                                            key={period}
                                            to=""
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {period}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
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

                    </div>
                </div> */}






                {/* <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-full">
                    <div className="overflow-hidden p-6">
                        <div className="flex items-center justify-between pb-4 overflow-hidden">
                            <h5 className="text-xl font-semibold text-gray-800 uppercase">Loan Summary By Value</h5>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <UilEllipsisV size={20} />
                                </button>
                               
                                <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    {['Today', '7 Days', '15 Days', '1 Month', '6 Months', '1 Year'].map((period) => (
                                        <Link
                                            key={period}
                                            to=""
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {period}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

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

                    </div>
                </div> */}



                {/* <div className="bg-white rounded-lg shadow-md overflow-hidden w-full h-full ">
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-semibold text-gray-800 uppercase">Loan Summary By Volume</h5>
                            <div className="h-8">
                                <Dropdown />
                            </div>
                        </div>
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
                    </div>
                </div> */}









            </div>

        </div>
    );
};

export default HomePage;