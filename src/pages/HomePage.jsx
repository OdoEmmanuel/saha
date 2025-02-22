import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../common/context/useAuthContext';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoMdCalendar } from "react-icons/io";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import RevenueChart from '../components/charts/RevenueChart';
import TragetChart from '../components/charts/TragetChart';
import SalesChart from '../components/charts/SalesChart';
import Ornament2 from '../assets/test2.png'
import Ornament13 from '../assets/TEST1.png'
import Ornament16 from '../assets/test3.png'
import CustomToggle from '../components/CustomSwitch';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
    // ... (keep all your existing state and functions)
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
        const body = {
            reference: null,
            startDate: null,
            endDate: null,
            pageIndex: pageNumber,
            pageSize: pagesize,
            approvalStatus: null
        }
        axios.post(`${middleware}loan/filter`, body, config)
            .then((res) => {

                setCustomers(res.data.data)
                SetElement(res.data.totalContent)

            }).catch((e) => {


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

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            className='relative z-0 p-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isLoading && (
                <motion.div
                    className="fixed bg-black/[0.6] h-screen w-screen z-[70] left-0 top-0 items-center flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </motion.div>
            )}
            <motion.h1
                className='text-[16px] sm:text-left xss:text-center'
                {...fadeInUp}
            >
                Welcome Back
            </motion.h1>
            <motion.div className='sm:flex justify-between' {...fadeInUp}>
                <motion.p
                    className='text-[26px] sm:text-left xss:text-center'

                >
                    {name}
                </motion.p>
                <motion.div
                    className='flex flex-col items-center'

                >


                    {/* <div className=" mb-5">
                        <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2">
                            <label className="text-gray-700">Date Range:</label>
                            <motion.div
                                className="relative flex items-center border border-gray-300 rounded px-3 py-2 bg-[#fff] hover:border-blue-500 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
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
                                    className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 pr-8 leading-tight focus:outline-none w-[16rem]"
                                />
                            </motion.div>
                        </div>
                    </div> */}
                    <div className="mb-5">
                        <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2">
                            <label className="text-gray-700">Date Range:</label>
                            <motion.div
                                className="relative flex items-center border rounded-[10px] border-gray-300  px-3 py-2 bg-[#fff] hover:border-blue-500 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IoMdCalendar className="text-gray-500 mr-2 flex-shrink-0" size={20} />
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => {
                                        setDateRange(update);
                                    }}
                                    isClearable={true}
                                    placeholderText="Select date range"
                                    className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 pr-8 leading-tight focus:outline-none min-w-[200px] w-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>



            <motion.div
                className='sm:grid grid-cols-3   gap-4 xss:flex flex-col items-center mt-5'
                variants={staggerChildren}
            // initial="initial"
            // animate="animate"
            >
                {[
                    { title: "Total Customers", value: data.noOfCustomers, image: Ornament13 },
                    { title: "Total Accounts", value: data.noOfAccounts, image: Ornament2 },
                    { title: "Total Transaction Counts", value: data.transactionCounts, image: Ornament16 }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className={`bg-[#fff] lg:w-full 2xl:w-full w-full h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
                            <p className='text-[#000000] text-[20px] font-[400]'>{item.title}</p>
                            <p className='text-[30px] text-[#000000] font-[600]'>{item.value}</p>
                        </div>
                        <motion.img
                            src={item.image}
                            className='absolute right-0 bottom-0'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="sm:grid flex flex-col lg:grid-cols-4 sm:grid-cols-2  gap-x-5 gap-y-4 mt-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden col-span-3 w-full"
                    variants={fadeInUp}
                >
                    <div className="overflow-hidden p-2">
                        <div className="sm:flex justify-between overflow-hidden">
                            <h5 className="text-[15px] font-semibold text-gray-800 ">
                                {showTransactionChart ? "Transaction Status Summary By Value" : "Loan Summary By Value"}
                            </h5>
                            <CustomToggle
                                onToggle={handleTransactionToggle}
                                label1="Transaction"
                                label2="Loan"
                            />
                        </div>
                        <RevenueChart
                            // ... (keep your existing props)
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
                </motion.div>


                <motion.div variants={fadeInUp} className='w-full'>
                    <motion.div className='flex flex-col gap-6 h-full' >
                        <div className='bg-[#fff] overflow-hidden rounded-lg shadow-md  px-8 py-8 h-full'>
                            <div className='flex justify-between'>
                                <h1 className='flex flex-col gap-2 text-[rgba(94,92,92,1)] text-[16px] font-[600]'>
                                    <span>
                                        Total
                                    </span>
                                    Loan Approved</h1>
                                <p className='flex flex-col gap-2 text-[rgba(94,92,92,1)] text-[16px] font-[600]'>
                                    <span className=''>{parseFloat(data.noOfLoanApproved)}</span>
                                    {Element}
                                </p>
                            </div>
                            <div className='flex items-center justify-center my-6 w-full'>
                                <button className='text-white btn w-full bg-[#072D56]   hover:bg-primary rounded-[10px]  py-2 px-4'> View Loans</button>
                            </div>

                        </div>
                        <div className='bg-[#fff] overflow-hidden rounded-lg shadow-md  px-8 py-8 h-full'>
                            <div className='flex justify-between'>
                                <h1 className='flex flex-col gap-2 text-[rgba(94,92,92,1)] text-[16px] font-[600]'>
                                    <span>
                                        Total
                                    </span>
                                    Loan Processed</h1>
                                <p className='flex flex-col gap-2 text-[rgba(94,92,92,1)] text-[16px] font-[600]'>
                                    <span className=''>{parseFloat(data.noOfLoanApproved)}</span>
                                    {Element}
                                </p>
                            </div>
                            <div className='flex items-center justify-center my-6'>
                                <button className='text-white btn bg-[#072D56] w-full   hover:bg-primary rounded-[10px]  py-2 px-4'> View Loans</button>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>


                <motion.div
                    className='bg-[#fff] overflow-hidden rounded-lg shadow-md col-span-2'
                    variants={fadeInUp}
                >
                    <SalesChart
                        // ... (keep your existing props)

                        series={complaintsStatusSummary.map(
                            (item) => item.complainCounts
                        )}
                        labels={complaintsStatusSummary.map(
                            (item) => item.complainCounts
                        )}
                        title="Transaction Status Summary By Volume"
                        name="Volume"

                    />
                </motion.div>

                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden w-full h-full col-span-2"
                    variants={fadeInUp}
                >
                    <div className="p-5">
                        <div className=" items-center justify-between mb-4">
                            <h5 className="text-[15px] font-semibold text-gray-800 mb-8 ">
                                {showLoanChart ? "Transaction Status Summary By Volume" : "Loan Summary By Volume"}
                            </h5>
                            <CustomToggle
                                onToggle={handleLoanToggle}
                                label1="Transaction"
                                label2="Loan"
                            />
                        </div>
                        <TragetChart
                            // ... (keep your existing props)
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
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HomePage;