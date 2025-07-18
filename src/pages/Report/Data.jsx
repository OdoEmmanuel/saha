import React, { useState, useEffect, useCallback } from 'react';
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { IoMdCalendar } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BiSearch } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";

import * as XLSX from "xlsx";

const Data = () => {
    const { middleware, request, clientid, setHeaders } = useAuthContext();
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([
        new Date(2020, 0, 1),
        new Date()
    ]);
    const [startDate, endDate] = dateRange;
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1)
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionStatuses, setTransactionStatuses] = useState([]);
    const [selectedTransactionType, setSelectedTransactionType] = useState('INTRABANK');
    const [selectedTransactionStatus, setSelectedTransactionStatus] = useState('SUCCESSFUL');
    const [filteredTransactiion, setFilteredTransaction] = useState([])
    const [searchQuery, setSearchQuery] = useState('')


    setHeaders('Data Purchase');

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };


    const formatDateString = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };


    const downloadExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.table_to_sheet(
            document.getElementById("transactions")
        );
        XLSX.utils.book_append_sheet(workbook, worksheet, "transaction");
        XLSX.writeFile(workbook, "transactions.xlsx");
    };

    const fetchTransactionData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${middleware}transaction/transaction-by-type-between-dates`,
                {
                    ...config,
                    params: {
                        transactionType: "DATA_PURCHASE",
                        transactionStatus: selectedTransactionStatus,
                        startDate: `${formatDateString(startDate)} 00:00:00`,
                        endDate: `${formatDateString(endDate)} 00:00:00`,
                        page: pageNumber,
                        size: pageSize
                    }
                }
            );

            setTransactions(response.data.transactions);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate, selectedTransactionType, selectedTransactionStatus, pageNumber, pageSize]);

    const fetchTransactionMetadata = useCallback(async () => {
        setIsLoading(true);
        try {
            const [typesResponse, statusesResponse] = await Promise.all([
                axios.get(`${middleware}transaction/transaction-types`, config),
                axios.get(`${middleware}transaction/transaction-status`, config)
            ]);
            setTransactionTypes(typesResponse.data.data);
            setTransactionStatuses(statusesResponse.data.data);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleApiError = (error) => {


        const responseMessage = error.response?.data?.responseMessage;
        if (responseMessage === 'Invalid/Expired Token' || responseMessage === 'Invalid Token' || responseMessage === 'Login Token Expired') {
            toast.error(responseMessage);
            navigate('/auth/login');
            localStorage.clear();
        } else if (responseMessage === 'Insufficient permission') {
            toast.error(responseMessage);
            navigate('/');
        } else {
            toast.error(responseMessage || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchTransactionMetadata();
    }, [fetchTransactionMetadata]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchTransactionData();
        }
    }, [fetchTransactionData, startDate, endDate]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }



    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTransaction(transactions);
        } else {
            const filtered = transactions.filter((transaction) => {
                // Check each field safely (using optional chaining and nullish coalescing)
                const searchableFields = [
                    transaction.loginId?.toString()?.toLowerCase() ?? '',
                    transaction.createdDate?.toString()?.toLowerCase() ?? '',
                    transaction.fromAccountNumber?.toString()?.toLowerCase() ?? '',
                    transaction.fromAccountName?.toString()?.toLowerCase() ?? '',
                    transaction.billerTransId?.toString()?.toLowerCase() ?? '',
                    transaction.receivingBankName?.toString()?.toLowerCase() ?? '',
                    transaction.type?.toString()?.toLowerCase() ?? '',
                    transaction.receiversPhoneNumber?.toString()?.toLowerCase() ?? '',
                    transaction.transactionAmount?.toString()?.toLowerCase() ?? '',
                    transaction.retrievalReferenceNumber?.toString()?.toLowerCase() ?? '',
                    transaction.transactionStatus?.toString()?.toLowerCase() ?? ''
                ];

                return searchableFields.some(field =>
                    field.includes(searchQuery.toLowerCase())
                );
            });
            setFilteredTransaction(filtered);
        }
    }, [searchQuery, transactions]);

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    let idCounter = pageNumber * pageSize + 1
    return (
        <div className='flex flex-col lg:p-0 p-4'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            <div className='bg-[#fff] mt-4 shadow-md p-6 overflow-hidden min-h-[350px]   rounded-[10px]'>
                <div className="md:flex justify-between mb-2">
                    <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2 ">
                        <div className="relative flex items-center border border-gray-300 rounded px-4 py-2 bg-[#fff] hover:border-blue-500 transition-colors duration-200 md:w-auto w-full">
                            <IoMdCalendar className="text-gray-500 mr-2" size={20} />
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => setDateRange(update)}
                                isClearable={true}
                                placeholderText="Select date range"
                                className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 pr-8 leading-tight focus:outline-none min-w-[200px] w-full"
                            />
                        </div>
                        <div className="flex  border-2 bg-[#fff] rounded-lg px-4 py-2   items-center md:my-4 my-2" >
                            <div className=' mr-2 text-gray-500'>
                                <BiSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                className=" bg-inherit rounded-md outline-none"
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </div>
                    <div className='md:flex justify-between items-center md:mt-0 mt-4 '>
                        {/* <select
                                               value={selectedTransactionType}
                                               onChange={(e) => setSelectedTransactionType(e.target.value)}
                                               className="rounded-[10px] border-2 p-2 mr-4 md:w-auto w-full"
                                           >
                                               <option value="">Select Transaction Type</option>
                                               {transactionTypes.map((type, index) => (
                                                   <option key={index} value={type.transactionType}>
                                                       {type.transactionType}
                                                   </option>
                                               ))}
                                           </select> */}
                        <div className='flex items-center justify-end rounded-[5px] border-2 p-2 md:my-4 my-2 md:mx-2 mx-0'>
                            <div>
                                <IoFilter />
                            </div>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(parseInt(e.target.value))}
                                className='outline-none'
                            >
                                
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                        <select
                            value={selectedTransactionStatus}
                            onChange={(e) => setSelectedTransactionStatus(e.target.value)}
                            className="border-2 p-2 rounded-[10px] md:w-auto w-full md:mt-0 mt-4"
                        >
                            <option value="">Select Transaction Status</option>
                            {transactionStatuses.map((status, index) => (
                                <option key={index} value={status.transactionStatus}>
                                    {status.transactionStatus}
                                </option>
                            ))}
                        </select>

                        <button onClick={downloadExcel} className='flex justify-between items-center rounded-[5px] border-2 p-2 my-4 md:mx-2 mx-0 md:w-auto w-full '>
                            <div className='mr-4'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_110_8471)">
                                        <path d="M3.99984 9.07335H9.07317V4.00002H15.9998V9.58669H17.3332V4.00002C17.3332 3.6464 17.1927 3.30726 16.9426 3.05721C16.6926 2.80716 16.3535 2.66669 15.9998 2.66669H7.2465L2.6665 7.24669V20C2.6665 20.3536 2.80698 20.6928 3.05703 20.9428C3.30708 21.1929 3.64622 21.3334 3.99984 21.3334H15.9998C16.3535 21.3334 16.6926 21.1929 16.9426 20.9428C17.1927 20.6928 17.3332 20.3536 17.3332 20H3.99984V9.07335ZM3.99984 7.79335L7.79317 4.00002H7.99984V8.00002H3.99984V7.79335Z" fill="#344054" />
                                        <path d="M18.8802 10.9C18.7526 10.7908 18.5886 10.7337 18.4208 10.7402C18.253 10.7467 18.0939 10.8162 17.9751 10.9349C17.8564 11.0537 17.7868 11.2128 17.7804 11.3806C17.7739 11.5484 17.8309 11.7125 17.9402 11.84L20.1068 14H12.0002C11.8234 14 11.6538 14.0702 11.5288 14.1953C11.4037 14.3203 11.3335 14.4898 11.3335 14.6667C11.3335 14.8435 11.4037 15.013 11.5288 15.1381C11.6538 15.2631 11.8234 15.3333 12.0002 15.3333H20.1268L17.9402 17.52C17.8704 17.5798 17.8137 17.6533 17.7737 17.736C17.7337 17.8187 17.7112 17.9088 17.7076 18.0006C17.7041 18.0924 17.7196 18.184 17.7531 18.2695C17.7866 18.3551 17.8374 18.4328 17.9024 18.4978C17.9674 18.5627 18.0451 18.6136 18.1306 18.6471C18.2162 18.6806 18.3077 18.6961 18.3995 18.6925C18.4913 18.689 18.5814 18.6665 18.6641 18.6265C18.7469 18.5865 18.8204 18.5298 18.8802 18.46L22.6668 14.6667L18.8802 10.9Z" fill="#344054" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_110_8471">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <p className='font-[400] text-[14px] font-inter'>Exports Transactions</p>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" id="transactions">
                        <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600]">
                            <tr>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">#</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Login ID</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Transaction Date</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Account Number</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Account Name</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Biller Reference</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Biller Name</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Service Type</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Mobile Number</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Amount</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Reference</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {filteredTransactiion.map((transaction, idx) => (
                                <tr key={idx} className="bg-[#fff] text-[#667085]">
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{idCounter++}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.loginId}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.createdDate}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.fromAccountNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.fromAccountName}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.billerTransId}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.receivingBankName}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.type}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.receiversPhoneNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.transactionAmount}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.retrievalReferenceNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.transactionStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls can be Createed here */}
                <div className='flex justify-between p-4'>
                    <div></div>

                    <div className="flex justify-end items-center ">
                        <button
                            className={`mr-2 ${pageNumber === 0
                                ? 'opacity-50 cursor-not-allowed bg-[#919EAB] border-2 border-[#919EAB] rounded-md'
                                : 'cursor-pointer border-2 rounded-md'
                                }`}
                            // onClick={() => onPageChange(currentPage - 1)}
                            onClick={handlePreviousPage}
                            disabled={pageNumber === 0}
                        >
                            <svg
                                className="w-6 h-6 inline-block align-middle"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>

                        </button>
                        <div className=' px-2 rounded-md'>
                            {pageNumber + 1} / {totalPages}
                        </div>
                        <button
                            className={`ml-2 ${pageNumber + 1 === totalPages
                                ? 'opacity-50 cursor-not-allowed bg-[#919EAB] border-2 border-[#919EAB] rounded-md'
                                : 'cursor-pointer border-2 rounded-md'
                                }`}
                            onClick={handleNextPage}
                            // disabled={currentPage === totalPages}
                            disabled={pageNumber + 1 === totalPages}
                        >

                            <svg
                                className="w-6 h-6 inline-block align-middle"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data