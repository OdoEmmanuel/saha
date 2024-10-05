import React, { useState, useEffect, useCallback } from 'react';
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { IoMdCalendar } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Transaction = () => {
    const { middleware, request, clientid, setHeaders } = useAuthContext();
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setMonth(new Date().getMonth() - 5)),
        new Date()
    ]);
    const [startDate, endDate] = dateRange;
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionStatuses, setTransactionStatuses] = useState([]);
    const [selectedTransactionType, setSelectedTransactionType] = useState('INTRABANK');
    const [selectedTransactionStatus, setSelectedTransactionStatus] = useState('SUCCESSFUL');

    setHeaders('Transactions');

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

    const fetchTransactionData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${middleware}transaction/transaction-by-type-between-dates`,
                {
                    ...config,
                    params: {
                        transactionType: selectedTransactionType,
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

        console.log(error.response?.data?.responseMessage)
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

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    return (
        <div className='flex flex-col lg:p-0 p-4'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            <div className='bg-[#fff] mt-4 shadow-md p-6 overflow-hidden rounded-[10px]'>
                <div className="md:flex justify-between mb-2">
                    <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2 w-full">
                        <div className="relative flex items-center border border-gray-300 rounded px-4 py-2 bg-[#fff] hover:border-blue-500 transition-colors duration-200">
                            <IoMdCalendar className="text-gray-500 mr-2" size={20} />
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => setDateRange(update)}
                                isClearable={true}
                                placeholderText="Select date range"
                                className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 pr-8 leading-tight focus:outline-none w-48"
                            />
                        </div>
                    </div>
                    <div className='md:flex justify-between md:mt-0 mt-4'>
                        <select
                            value={selectedTransactionType}
                            onChange={(e) => setSelectedTransactionType(e.target.value)}
                            className="rounded-[10px] border-2 p-2 mr-4"
                        >
                            <option value="">Select Transaction Type</option>
                            {transactionTypes.map((type, index) => (
                                <option key={index} value={type.transactionType}>
                                    {type.transactionType}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedTransactionStatus}
                            onChange={(e) => setSelectedTransactionStatus(e.target.value)}
                            className="border-2 p-2 rounded-[10px] "
                        >
                            <option value="">Select Transaction Status</option>
                            {transactionStatuses.map((status, index) => (
                                <option key={index} value={status.transactionStatus}>
                                    {status.transactionStatus}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600]">
                            <tr>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">ID</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Type</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Status</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Amount</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Date</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Description</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">From Account</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">To Account</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Reference Number</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Narration</th>
                                <th className="px-4 py-4 text-start  whitespace-nowrap">Bank Name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {transactions.map((transaction, idx) => (
                                <tr key={idx} className="bg-[#fff] text-[#667085]">
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.id}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.type}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.transactionStatus}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.transactionAmount}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{new Date(...transaction.createdDate).toLocaleString()}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.transactionDescription}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.fromAccountNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.toAccountNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.retrievalRefferenceNumber}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.narration}</td>
                                    <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">{transaction.receivingBankName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls can be added here */}
            </div>
        </div>
    );
};

export default Transaction;