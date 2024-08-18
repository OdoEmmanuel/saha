import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate,Link } from 'react-router-dom';

function pad(num) {
    var s = '' + num
    if (num < 10) {
        s = '0' + num
    }
    return s
}

const AllCustomer = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [pagesize, SetPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    setHeaders('ALL CUSTOMERS')


    useEffect(() => {
        calculateMonthPeriod()
        fetchData()
    }, [pageNumber, startDate, endDate, pagesize])

    // useEffect(() => {

    // }, [])


    const calculateMonthPeriod = () => {
        const currentDate = new Date()
        const endMonth = currentDate.getMonth()
        const endYear = currentDate.getFullYear()
        const startMonth = endMonth === 0 ? 11 : endMonth - 1
        const startYear = startMonth === 11 ? endYear - 1 : endYear

        const formattedStartDate = `${startYear}-${String(startMonth + 1).padStart(
            2,
            '0'
        )}-01`
        const formattedEndDate = `${endYear}-${String(endMonth + 1).padStart(
            2,
            '0'
        )}-${pad(currentDate.getDate())}`

        setStartDate(formattedStartDate)
        setEndDate(formattedEndDate)
    }


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
        axios.get(`${middleware}user/getUsersBetweenCreationDates?startDate=${startDate} 00:00:00&endDate=${endDate} 00:00:00&pageNumber=${pageNumber}&pageSize=${pagesize}`, config)
            .then((res) => {
                console.log(res.data.data.users.totalPages)
                setUsers(res.data.data.users.content)
                setTotalPages(res.data.data.users.totalPages)
            })
            .catch((e) => {
                console.log(e.response.data.responseMessage)

                if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
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


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value)
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

    let idCounter = pageNumber * pagesize + 1


    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <div className=" flex flex-col rounded-lg ">
                    <div className="flex flex-col md:flex-row md:items-center ">
                        <div className="flex items-center space-x-4 mt-2 md:mt-0 md:ml-4 ">
                            <label className="text-gray-700">From:</label>
                            <div className="flex items-center border-2 rounded bg-[#fff]">
                                <svg
                                    className="w-5 h-5 text-gray-500 mr-2 ml-1"
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
                                    className="bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
                                    placeholder="Select Date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 md:mt-0 md:ml-4">
                            <label className="text-gray-700">To:</label>
                            <div className="flex items-center border-2 rounded bg-[#fff]">
                                <svg
                                    className="w-5 h-5 text-gray-500 mr-2 ml-1"
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
                                    className="bg-transparent border-none text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Select Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex  border-2 bg-[#fff] rounded-lg px-4 items-center">
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

            <div className='bg-[#fff] mt-16 shadow-md  overflow-x-scroll no-scrollbar  rounded-[5px]'>
                <div className="">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-blue-200 ">
                                    <tr className="text-gray-700 dark:text-gray-200">
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            First Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            Last Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            BVN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            MOBILE{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            Gender{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            DOB{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            State{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap">
                                            {' '}
                                            NIN{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm font-semibold whitespace-nowrap"></th>
                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className={
                                                    idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                                                }
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
                                                    <Link
                                                        to={`/ui/customer/Veiw-all-customer/${staff.id}`}
                                                        className="text-white btn bg-primary/90 hover:bg-primary"
                                                    >
                                                        view
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
            </div>
        </div>
    )
}

export default AllCustomer