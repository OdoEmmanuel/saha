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

const ActiveLoan = () => {
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
    const type =  "PROCESSED"

    setHeaders('Active Loans')

    useEffect(() => {

        setisLoading(true)
        fetchData()

    }, [pageNumber, pagesize])



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


    function TrimText(text) {
        if (text === null) {
            return ''
        }
        const trimmedText = text.length > 30 ? text.substring(0, 30) + '...' : text
        return trimmedText
    }

    function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }



    const fetchData = async () => {
        const body = {
            reference: null,
            startDate: null,
            endDate: null,
            pageIndex: pageNumber,
            pageSize: pagesize,
            approvalStatus: type
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
        setisLoading(true)
        axios.post(`${middleware}loan/filter`, body, config)
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

    useEffect(() => {
        if (searchQuery.trim() === '') {
            // If search query is empty, do not filter users
            setFilteredUsers(users)
        } else {
            // Filter users based on search query
            const filteredUsers = users.filter((user) => {
                if (
                    user.purpose === null ||
                    user.approvalStatus === null ||
                    user.customerEmail === null
                ) {
                    return false
                }

                return (
                    user.purpose
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.approvalStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, users])

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

        <div className="flex  border-2 bg-[#fff] rounded-lg px-4 items-center lg:mt-0 mt-5 p-2" >
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

    <div className='bg-[#fff] mt-16 shadow-md overflow-hidden   rounded-[10px]'>

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
                                    Customer Email{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Loan Product Code{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                    {' '}
                                    Loan Amount{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Tenure{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Moratorium{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Purpose{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Disbursement Account{' '}
                                </th>

                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Loan Account{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Interest Rate{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Approval Status{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Created Date{' '}
                                </th>
                                <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                    {' '}
                                    Updated Date{' '}
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
                                            {staff.loanProductCode}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {staff.loanAmount}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {staff.tenure}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {staff.moratium}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {staff.purpose}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {staff.disbursementAccount}
                                        </td>

                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {TrimText(staff.loanAccount)}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {TrimText(staff.interestRate)}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {removeUnderscores(staff.approvalStatus)}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {formatDateString(staff.createdDate)}
                                        </td>
                                        <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                            {formatDateString(staff.updatedDate)}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            <Link
                                                to={`/ui/LoanApproval/${staff.reference}/details`}
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
            <div className="flex justify-between">
                <div></div>
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
            <div className="flex justify-end items-center">
                <button
                    className={`mr-2 ${pageNumber === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
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
                    Prev
                </button>
                <div>
                    {pageNumber + 1} of {totalPages}
                </div>
                <button
                    className={`ml-2 ${pageNumber + 1 === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                        }`}
                    onClick={handleNextPage}
                    // disabled={currentPage === totalPages}
                    disabled={pageNumber + 1 === totalPages}
                >
                    Next
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

export default ActiveLoan