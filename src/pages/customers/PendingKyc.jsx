import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const PendingKyc = () => {

    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [pagesize, SetPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    setHeaders('Pending KYC')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    useEffect(() => {

        setisLoading(true)
        fetchData()

    }, [pageNumber, pagesize])


    const fetchData = () => {
        axios.get(`${middleware}user/getCustomersByKycStatus?pageNumber=${pageNumber}&pageSize=${pagesize}`, config)
            .then((res) => {
                console.log(res.data.data.users.content)
                setUsers(res.data.data.users.content)
                setTotalPages(res.data.data.users.totalPages)
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
                setisLoading(false)
            })
    }


    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
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
                    user.lastName === null
                ) {
                    return false
                }

                return (
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, users])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
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


            <div className='bg-[#fff] mt-4 shadow-md overflow-hidden p-6    rounded-[10px]'>
                <div className="flex justify-between ">
                    <div className="flex  border-2 bg-[#fff] p-2 rounded-lg px-4 my-4 items-center">
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

                </div>
                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                                    <tr className=" ">
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            First Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Last Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            BVN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            MOBILE{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Gender{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            DOB{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            State{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            NIN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap"></th>

                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className={` text-[#667085] ${idx % 2 === 0 ? 'bg-[#F3F9FF]':'bg-[#fff]'}`}
                                            >
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {idCounter++}

                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.firstName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.lastName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.email}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.bvn}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.mobilePhone}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.gender}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {formatDate(staff.dateOfBirth)}
                                                </td>

                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.stateOfResidence}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.nin}
                                                </td>
                                                <td className="px-4 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    <Tippy content="View">
                                                    <Link
                                                        to={`/ui/customer/pending-kyc/view/${staff.id}`}
                                                        className="text-blue-500/[0.7] hover:text-[rgb(79,70,229)]"
                                                    >
                                                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 7C6.25 6.00544 6.64509 5.05161 7.34835 4.34835C8.05161 3.64509 9.00544 3.25 10 3.25C10.9946 3.25 11.9484 3.64509 12.6517 4.34835C13.3549 5.05161 13.75 6.00544 13.75 7C13.75 7.99456 13.3549 8.94839 12.6517 9.65165C11.9484 10.3549 10.9946 10.75 10 10.75C9.00544 10.75 8.05161 10.3549 7.34835 9.65165C6.64509 8.94839 6.25 7.99456 6.25 7ZM10 4.75C9.40326 4.75 8.83097 4.98705 8.40901 5.40901C7.98705 5.83097 7.75 6.40326 7.75 7C7.75 7.59674 7.98705 8.16903 8.40901 8.59099C8.83097 9.01295 9.40326 9.25 10 9.25C10.5967 9.25 11.169 9.01295 11.591 8.59099C12.0129 8.16903 12.25 7.59674 12.25 7C12.25 6.40326 12.0129 5.83097 11.591 5.40901C11.169 4.98705 10.5967 4.75 10 4.75Z" fill="#072D56" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.323 5.646C1.904 6.25 1.75 6.723 1.75 7C1.75 7.277 1.904 7.75 2.323 8.354C2.729 8.937 3.331 9.57 4.093 10.155C5.62 11.327 7.713 12.25 10 12.25C12.287 12.25 14.38 11.327 15.907 10.155C16.669 9.57 17.271 8.937 17.677 8.354C18.096 7.75 18.25 7.277 18.25 7C18.25 6.723 18.096 6.25 17.677 5.646C17.271 5.063 16.669 4.43 15.907 3.845C14.38 2.673 12.287 1.75 10 1.75C7.713 1.75 5.62 2.673 4.093 3.845C3.331 4.43 2.729 5.063 2.323 5.646ZM3.179 2.655C4.91 1.327 7.316 0.25 10 0.25C12.684 0.25 15.09 1.327 16.82 2.655C17.687 3.32 18.403 4.062 18.909 4.791C19.401 5.5 19.75 6.277 19.75 7C19.75 7.723 19.4 8.5 18.909 9.209C18.403 9.938 17.687 10.679 16.821 11.345C15.091 12.673 12.684 13.75 10 13.75C7.316 13.75 4.91 12.673 3.18 11.345C2.313 10.68 1.597 9.938 1.091 9.209C0.6 8.5 0.25 7.723 0.25 7C0.25 6.277 0.6 5.5 1.091 4.791C1.597 4.062 2.313 3.321 3.179 2.655Z" fill="#072D56" />
                                                        </svg>

                                                    </Link>
                                                    </Tippy>
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
                    <div className="flex justify-end items-center">
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

export default PendingKyc