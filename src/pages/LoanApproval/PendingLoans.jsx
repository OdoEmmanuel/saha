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

const PendingLoans = () => {
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

    setHeaders('Pending Loans')

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


    const fetchData = async () => {
        const body = {
            approvalItemType: 'Loan',
            companyCode: 'GTI',
            currentApprovalStage: null,
            reference: null,
            approvalStatus: null,
            startDate: null,
            endDate: null,
            allowOnlyLoggedInUser: true,
            pageIndex: pageNumber,
            pageSize: pagesize,
        }

        setisLoading(true)
        axios.post(`${authorizationService}approvals/filter`, body, config)
            .then((res) => {
                setUsers(res.data.data)
                setTotalPages(res.data.totalPages)
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

    const formatDateString = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`
    }


    const bookandUnbook = async (reference, status) => {
        try {
            if (status === 'booked') {
                axios.post(`${authorizationService}approvals/${reference}/unbook`, null, config)
                    .then((res) => {
                        toast.success(`${res.data.responseMessage}`)
                        fetchData()
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

            else {
                axios.post(`${authorizationService}approvals/${reference}/book`, null, config)
                    .then((res) => {
                        toast.success(`${res.data.responseMessage}`)
                        fetchData()
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
        } catch (error) {

        }
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
                    user.customerEmail === null || user.approvalStatus === null
                ) {
                    return false
                }

                return (
                    user.customerEmail
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.approvalStatus.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, users])

    let idCounter = pageNumber * pagesize + 1
    return (
        <div className='flex flex-col'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className='lg:flex justify-between'>
                <div className=" flex flex-col rounded-lg ">

                </div>


            </div>

            <div className='bg-[#fff] mt-16 shadow-md overflow-hidden   rounded-[10px]'>
                <div className="flex justify-between m-2">
                    <div className="flex  border-2 bg-[#fff] rounded-lg px-4 items-center my-4 p-2" >
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

                                <thead className="bg-gray-50 text-[#667085] font-[500] ">
                                    <tr className=" ">
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Stage{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Phone{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            loan Amount{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Customer Id{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Reference{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Approval Status{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Monthly Income{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Created At{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Action (s){' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap"></th>
                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className="bg-[#fff] text-[#667085]"
                                            >
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {idCounter++}

                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.customerEmail}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.customerPhone}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.currentApprovalStage}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.body.loanAmount}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.body.customerId}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.reference}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.approvalStatus}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.body.monthlyIncome}
                                                </td>

                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {formatDateString(staff.createdAt)}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    <button onClick={() => bookandUnbook(staff.reference, staff.bookStatus)} className={`${staff.bookStatus === 'Booked' ? 'bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-500/[.57] transition-colors duration-300' : 'bg-green-500 text-white text-xs px-2 py-1 rounded-md hover:bg-green-500/[.57] transition-colors duration-300'}`}>
                                                        {
                                                            staff.bookStatus === 'Booked' ? 'Unbook' : 'Book'
                                                        }
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    <Link
                                                        to={`/ui/LoanApproval/pendingloans/${staff.reference}`}
                                                        className="text-blue-500/[0.7] hover:text-[rgb(79,70,229)]"
                                                    >
                                                        <IoEyeSharp size={'1.5em'} />
                                                    </Link>
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

export default PendingLoans