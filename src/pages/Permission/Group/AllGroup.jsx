import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

const AllGroup = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [allStaff, setAllStaff] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    setHeaders(`ALL Group`)
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

        axios.get(`${authorizationService}groups`, config)
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
                    user.groupName === null ||
                    user.description === null ||
                    user.status ===null
                ) {
                    return false
                }

                return (
                    user.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.description.toLowerCase().includes(searchQuery.toLowerCase())||
                    user.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                            to={`/ui/permission/Addgroup`}
                            className="text-white btn bg-[#072D56]   hover:bg-primary rounded-[10px] my-4 py-2 px-4"
                        >
                            {' '}
                            Add Group
                        </Link>


                    </div>
                

                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                                    <tr className=" ">

                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            ID
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Group Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start  whitespace-nowrap">
                                            {' '}
                                            Decsription{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Status{' '}
                                        </th>
                                    
                                        
                                       
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap"></th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap"></th>
                                        
                                    </tr>
                                </thead>

                                {filteredUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredUsers.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className={` text-[#667085] ${idx % 2 === 0 ? 'bg-[#F3F9FF]' : 'bg-[#fff]'}`}
                                            >
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {idCounter++}

                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.groupName}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.description}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.status}
                                                </td>
                                              
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    <Link to={`/ui/permission/assign-permission-group/${staff.id}`} className={` bg-[#072D56]     text-[#fff] text-xs px-4 py-2 rounded-[5px] w-[150px] hover:bg-[#072D56]/[.57]    transition-colors duration-300`} >
                                                        Assign Permission
                                                    </Link>

                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">

                                                    <Link
                                                        to={`/ui/permission/updategroup/${staff.id}`}
                                                        className="text-[#072D56]"
                                                    >
                                                        <FaPen size={'1.5em'} />
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

export default AllGroup