import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

const AllFixedDeposit = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [allfixed, setAllFixed] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    setHeaders(`Fixed Desposits`)


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
        fetchData()
    }, [])


    const fetchData = () => {
        setisLoading(true)
        axios.get(`${middleware}fixed-deposit-setup`, config)
            .then((res) => {
                console.log(res.data.allFixedDeposits)
                setAllFixed(res.data.allFixedDeposits)
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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }


    const toggle = (id) => {
        
        axios.post(`${middleware}fixed-deposit-setup/availability-status/${id}/toggle`,null,config)
        .then((res)=> {
            toast.success(res.data.responseMessage)
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


    useEffect(() => {
        if (searchQuery.trim() === '') {
            // If search query is empty, do not filter users
            setFilteredUsers(allfixed)
        } else {
            // Filter users based on search query
            const filteredUsers = allfixed.filter((user) => {
                if (
                    user.fixedDepositType === null ||
                    user.description === null
                ) {
                    return false
                }

                return (
                    user.fixedDepositType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, allfixed])

    let idCounter = 1;
    return (
        <div className='flex flex-col'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}


            <div className='bg-[#fff] mt-4 shadow-md overflow-hidden p-6   rounded-[10px]'>


                <div className="flex justify-between ">
                    <div className="flex  border-2 bg-[#fff] rounded-lg px-4 my-4 items-center  p-2" >
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

                    <Link
                        to={`/ui/fixed-deposit/createnewfixed`}
                        className="text-white btn bg-[#072D56]   hover:bg-primary rounded-[10px] my-4 py-2 px-4"
                    >
                        {' '}
                        Add Deposits
                    </Link>


                </div>


                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                                    <tr className=" ">

                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}

                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Fixed Deposit Type{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Description{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Rate{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Tax{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Tenure{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Tax Deductible{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Min Amount{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Max Amount{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">Action(s)</th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap"></th>
                                      
                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className={` text-[#667085] ${idx % 2 === 0 ? 'bg-[#F3F9FF]' : 'bg-[#fff]'}`}
                                            >
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {idCounter++}

                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.fixedDepositType}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.description}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.rate}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.tax}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.tenure}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.taxDeductible}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.minAmount}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.maxAmount}
                                                </td>

                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    <button onClick={() => toggle(staff.id)} className={`${staff.available === false ? 'bg-[#E2FFF1] border-2 border-[#0FA958]  text-[#000000] text-xs px-4 py-2 rounded-[25px] w-[150px] hover:bg-green-500/[.57] transition-colors duration-300' : 'bg-[#FFE8EA] border-2 border-[#DC3545]   text-[#000000] rounded-[25px] text-xs px-4 py-2 w-[150px] hover:bg-red-500/[.57] transition-colors duration-300'}`} >
                                                        {staff.available === false ? 'Enable' : 'Disable'}
                                                    </button>

                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap flex items-center">

                                                    <Link
                                                        to={`/ui/fixed-deposit/updateFixed/${staff.id}`}
                                                        className="text-[#072D56] mr-8"
                                                    >
                                                        <FaPen size={'1.5em'} />
                                                    </Link>

                                                    <Link
                                                        to={`/ui/fixed-deposit/viewFixed/${staff.id}`}
                                                        className="text-blue-500/[0.7] hover:text-[rgb(79,70,229)]"
                                                    >
                                                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 7C6.25 6.00544 6.64509 5.05161 7.34835 4.34835C8.05161 3.64509 9.00544 3.25 10 3.25C10.9946 3.25 11.9484 3.64509 12.6517 4.34835C13.3549 5.05161 13.75 6.00544 13.75 7C13.75 7.99456 13.3549 8.94839 12.6517 9.65165C11.9484 10.3549 10.9946 10.75 10 10.75C9.00544 10.75 8.05161 10.3549 7.34835 9.65165C6.64509 8.94839 6.25 7.99456 6.25 7ZM10 4.75C9.40326 4.75 8.83097 4.98705 8.40901 5.40901C7.98705 5.83097 7.75 6.40326 7.75 7C7.75 7.59674 7.98705 8.16903 8.40901 8.59099C8.83097 9.01295 9.40326 9.25 10 9.25C10.5967 9.25 11.169 9.01295 11.591 8.59099C12.0129 8.16903 12.25 7.59674 12.25 7C12.25 6.40326 12.0129 5.83097 11.591 5.40901C11.169 4.98705 10.5967 4.75 10 4.75Z" fill="#072D56" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.323 5.646C1.904 6.25 1.75 6.723 1.75 7C1.75 7.277 1.904 7.75 2.323 8.354C2.729 8.937 3.331 9.57 4.093 10.155C5.62 11.327 7.713 12.25 10 12.25C12.287 12.25 14.38 11.327 15.907 10.155C16.669 9.57 17.271 8.937 17.677 8.354C18.096 7.75 18.25 7.277 18.25 7C18.25 6.723 18.096 6.25 17.677 5.646C17.271 5.063 16.669 4.43 15.907 3.845C14.38 2.673 12.287 1.75 10 1.75C7.713 1.75 5.62 2.673 4.093 3.845C3.331 4.43 2.729 5.063 2.323 5.646ZM3.179 2.655C4.91 1.327 7.316 0.25 10 0.25C12.684 0.25 15.09 1.327 16.82 2.655C17.687 3.32 18.403 4.062 18.909 4.791C19.401 5.5 19.75 6.277 19.75 7C19.75 7.723 19.4 8.5 18.909 9.209C18.403 9.938 17.687 10.679 16.821 11.345C15.091 12.673 12.684 13.75 10 13.75C7.316 13.75 4.91 12.673 3.18 11.345C2.313 10.68 1.597 9.938 1.091 9.209C0.6 8.5 0.25 7.723 0.25 7C0.25 6.277 0.6 5.5 1.091 4.791C1.597 4.062 2.313 3.321 3.179 2.655Z" fill="#072D56" />
                                                        </svg>

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

export default AllFixedDeposit