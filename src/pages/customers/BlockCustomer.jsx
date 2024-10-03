import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

const BlockCustomer = () => {
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

  setHeaders('Blocked Customers')

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

  }, [])



  const fetchData = () => {
    axios.get(`${middleware}blockedCustomers`, config)
      .then((res) => {
        console.log(res.data.data.users)
        setUsers(res.data.data.users)

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

  const handleBlockandUnblockUser = (id) => {


    axios.put(`${middleware}unBlockCustomerAccount?customerId=${id}`, null, config)
      .then((res) => {
        toast.success(res.data.data.responseData)
        fetchData()
      }).catch((e) => {
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
      <div className='flex justify-between'>
        <div></div>

      </div>

      <div className='bg-[#fff] mt-4 shadow-md overflow-hidden p-6  rounded-[10px]'>

        <div className='flex justify-between my-4 '>
          <div className="flex  border-2 bg-[#fff] p-2 rounded-lg px-4 items-center">
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
          <div></div>
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
                      NIN{' '}
                    </th>
                    <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">Actions</th>

                  </tr>
                </thead>

                {filteredUsers.length > 0 ? (
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {filteredUsers.map((staff, idx) => (
                      <tr
                        key={idx}
                        className={` text-[#667085] ${idx % 2 === 0 ? 'bg-[#F3F9FF]':'bg-[#fff]'}`}
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
                          {staff.nin}
                        </td>

                        <td className="px-4 py-4 text-center  font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <button onClick={() => handleBlockandUnblockUser(staff.id)} className={` bg-green-500 text-white text-xs px-2 py-1 rounded-md hover:bg-green-500/[.57] transition-colors duration-300`}>
                            Unblock Customer

                          </button>
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



        {/* <div className='flex justify-between p-4'>
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
        </div> */}





      </div>
    </div>
  )
}

export default BlockCustomer