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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const AllStaff = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [allStaff, setAllStaff] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    setHeaders(`All Staff`)
    useEffect(() => {
        setisLoading(true);
        fetchData()

    }, [])

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };


    const fetchData = () => {

        axios.post(`${authorizationService}user`, null, config)
            .then((res) => {

                setAllStaff(res.data.data)
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


    const toggleStaffHandle = (staffId) => {
        axios.post(`${authorizationService}user/${staffId}/toggle`, null, config)
            .then((res) => {
                toast.success(res.data.responseMessage)
                fetchData()
            })
    }


    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }



    useEffect(() => {
        if (searchQuery.trim() === '') {
            // If search query is empty, do not filter users
            setFilteredUsers(allStaff)
        } else {
            // Filter users based on search query
            const filteredUsers = allStaff.filter((user) => {
                if (
                    user.email === null ||
                    user.staffName === null
                ) {
                    return false
                }

                return (
                    user.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredUsers(filteredUsers)
        }
    }, [searchQuery, allStaff])

    let idCounter = 1;


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
                            to={`/ui/staffs/AddStaff`}
                            className="text-white btn bg-[#072D56]   hover:bg-primary rounded-[10px] my-4 py-2 px-4"
                        >
                            {' '}
                            Add Staff
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
                                            ID
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            PHONE{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            UserType{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Status{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap"></th>
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
                                                    {staff.staffName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.email}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.phone}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.userType}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.status}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    <button onClick={() => toggleStaffHandle(staff.id)} className={`${staff.status === 'Disabled' ? 'bg-[#E2FFF1] border-2 border-[#0FA958]  text-[#000000] text-xs px-4 py-2 rounded-[25px] w-[150px] hover:bg-green-500/[.57] transition-colors duration-300' : 'bg-[#FFE8EA] border-2 border-[#DC3545]   text-[#000000] rounded-[25px] text-xs px-4 py-2 w-[150px] hover:bg-red-500/[.57] transition-colors duration-300'}`} >
                                                        {staff.status === 'Disabled' ? 'Enable' : 'Disable'}
                                                    </button>

                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                  <Tippy content="Edit">
                                                    <Link
                                                        to={`/ui/staffs/UpdateStaff/${staff.id}`}
                                                        className="text-[#072D56]"
                                                    >
                                                        <FaPen size={'1.5em'} />
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

            </div>
        </div>
    )
}

export default AllStaff