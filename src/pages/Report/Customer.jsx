import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import Checkbox from "../../assets/checkbox.png"
import { IoMdCalendar } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
function pad(num) {
    var s = '' + num
    if (num < 10) {
        s = '0' + num
    }
    return s
}

const Customer = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setMonth(new Date().getMonth() - 5)),
        new Date()
    ]);
    const [startDate, endDate] = dateRange;
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [pagesize, SetPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [element, setElement] = useState(0)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    setHeaders('ALL CUSTOMERS')

    useEffect(() => {
        if (startDate && endDate) {
            fetchData().finally(() => setisLoading(false));
        }
    }, [dateRange, pageNumber, pagesize]);




    const fetchData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'client-id': clientid,
                'Content-Type': 'application/json',
                'request-source': request,
                'Username': email
            },
        };
        setisLoading(true)
        axios.get(`${middleware}user/getUsersBetweenCreationDates?startDate=${formatDateString(startDate)} 00:00:00&endDate=${formatDateString(endDate)} 00:00:00&pageNumber=${pageNumber}&pageSize=${pagesize}`, config)
            .then((res) => {
                setUsers(res.data.data.users.content)
                setTotalPages(res.data.data.users.totalPages)
                setElement(res.data.data.users.numberOfElements)

            })
            .catch((e) => {
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
            })
            .finally(() => {
                setisLoading(false)
            })
    }


    const formatDateString = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    useEffect(() => {
        if (searchQuery.trim() === '') {
            // If search query is empty, do not filter users
            setFilteredUsers(users)
        } else {
            // Filter users based on search query
            const filteredUsers = users.filter((user) => {
                if (
                    user.email === null ||
                    user.firstName === null ||
                    user.lastName === null ||
                    user.customerType === null
                ) {
                    return false
                }

                return (
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.customerType.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, users])



    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    let idCounter = pageNumber * pagesize + 1
  return (
    <div className='flex flex-col lg:p-0 p-4'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className='lg:flex justify-between'>



            </div>

            <div className='bg-[#fff] mt-4 shadow-md overflow-hidden p-6   rounded-[10px]'>

                <div className="flex justify-between ">
                    <div className=" flex flex-col rounded-lg ">
                        <div className="flex items-center space-x-4 md:flex-row md:items-center md:space-x-4 mt-2">

                            <div className="relative flex items-center border border-gray-300 rounded px-4 py-2  bg-[#fff] hover:border-blue-500 transition-colors duration-200">
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
                    <div className='flex justify-between'>
                        <div className='flex items-center justify-end rounded-[5px] border-2 p-2 my-4 mx-2'>
                            <div>
                                <IoFilter />
                            </div>
                            <select
                                value={pagesize}
                                onChange={(e) => SetPageSize(parseInt(e.target.value))}
                                className='outline-none'
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="flex  border-2 bg-[#fff] rounded-lg px-4 py-2   items-center my-4" >
                            <div className=' mr-2 text-gray-500'>
                                <BiSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by email "
                                value={searchQuery}
                                className=" bg-inherit rounded-md outline-none"
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </div>


                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                                    <tr className=" ">
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            First Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Last Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start  whitespace-nowrap">
                                            {' '}
                                            Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            BVN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            MOBILE{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Gender{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            DOB{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            State{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Place of Birth{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            NIN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            Customer Type
                                        </th>
                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className="bg-[#fff] text-[#667085]"
                                            >
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {idCounter++}

                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.firstName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.lastName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.email}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.bvn}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.mobilePhone}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.gender}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {formatDate(staff.dateOfBirth)}
                                                </td>

                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.stateOfResidence}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.placeOfBirth}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.nin}
                                                </td>
                                                <td className="px-4 py-4 text-center  font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {staff.customerType}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <p></p>
                                )}


                            </table>

                        </div>
                    </div>
                </div>



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
                        <div className='border-2 px-2 rounded-md'>
                            {pageNumber + 1} 
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

export default Customer