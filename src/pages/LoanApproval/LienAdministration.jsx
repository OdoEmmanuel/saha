import React, { useState, useEffect, useRef } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import Checkbox from "../../assets/checkbox.png"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import * as XLSX from "xlsx";
import { MdMoreVert, } from "react-icons/md";
import Modal from './modal';
const LienAdministration = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [pagesize, SetPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [users, setUsers] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const dropdownRef = useRef(null);
    const [open,setOpen] = useState(false)
    const [applicationId, setApplicationId] = useState(null);

    const productCode = import.meta.env.VITE_productCode
    console.log(productCode)

    setHeaders('Lien Administration')

    function func() {
        setOpen(!open)
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


    useEffect(() => {
        function handleDropdownClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        }

        if (activeDropdown !== null) {
            document.addEventListener("mousedown", handleDropdownClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleDropdownClickOutside);
        };
    }, [activeDropdown]);

    const downloadExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.table_to_sheet(
            document.getElementById("Loan-admin")
        );
        XLSX.utils.book_append_sheet(workbook, worksheet, "Loan Adminisration Table");
        XLSX.writeFile(workbook, "Loan-admin.xlsx");
    };

    useEffect(() => {

        setisLoading(true)
        fetchData()

    }, [pageNumber, pagesize])


    const fetchData = async () => {
        const requestbody = {
            approvalItemType: 'Loan',
            companyCode: 'GTI',
            currentApprovalStage: null,
            reference: null,
            approvalStatus: null,
            startDate: null,
            endDate: null,
            allowOnlyLoggedInUser: false,
            pageIndex: pageNumber,
            pageSize: pagesize,
            productCode:productCode
        }

        setisLoading(true)
        axios.post(`${middleware}loan/filter`, requestbody, config)
            .then((res) => {
                setUsers(res.data.data)
                setTotalPages(res.data.totalPages)
                setElement(res.data.data.users.numberOfElements)

            })
            .catch((e) => {


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
        return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`
    }

    const handleActionClick = (userId) => {
        if (activeDropdown === userId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(userId);
        }
    };


    const bookandUnbook = async (reference, status) => {
        try {
            if (status === 'booked') {
                axios.post(`${authorizationService}approvals/${reference}/unbook`, null, config)
                    .then((res) => {
                        toast.success(`${res.data.responseMessage}`)
                        fetchData()
                    })
                    .catch((e) => {


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
        <div className='flex flex-col lg:p-0 p-4'>
            {open && <Modal func={() => setOpen(false)} id={applicationId}/>}
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

            <div className='bg-[#fff] mt-4 shadow-md overflow-hidden  p-6  rounded-[10px]'>
                <div className="sm:flex justify-between ">
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
                    <div className='flex sm:w-auto w-full'>
                        <div className='flex items-center justify-end rounded-[5px] border-2 p-2 my-4 sm:mx-2 mx-0  sm:w-auto w-[30%]'>
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
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                            </select>
                        </div>
                        <button onClick={downloadExcel} className='flex justify-between items-center rounded-[5px] border-2 p-2 my-4 sm:mx-2 mx-0  sm:w-auto w-full sm:ml-0 ml-4'>
                            <div className='mr-4'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_110_8471)">
                                        <path d="M3.99984 9.07335H9.07317V4.00002H15.9998V9.58669H17.3332V4.00002C17.3332 3.6464 17.1927 3.30726 16.9426 3.05721C16.6926 2.80716 16.3535 2.66669 15.9998 2.66669H7.2465L2.6665 7.24669V20C2.6665 20.3536 2.80698 20.6928 3.05703 20.9428C3.30708 21.1929 3.64622 21.3334 3.99984 21.3334H15.9998C16.3535 21.3334 16.6926 21.1929 16.9426 20.9428C17.1927 20.6928 17.3332 20.3536 17.3332 20H3.99984V9.07335ZM3.99984 7.79335L7.79317 4.00002H7.99984V8.00002H3.99984V7.79335Z" fill="#344054" />
                                        <path d="M18.8802 10.9C18.7526 10.7908 18.5886 10.7337 18.4208 10.7402C18.253 10.7467 18.0939 10.8162 17.9751 10.9349C17.8564 11.0537 17.7868 11.2128 17.7804 11.3806C17.7739 11.5484 17.8309 11.7125 17.9402 11.84L20.1068 14H12.0002C11.8234 14 11.6538 14.0702 11.5288 14.1953C11.4037 14.3203 11.3335 14.4898 11.3335 14.6667C11.3335 14.8435 11.4037 15.013 11.5288 15.1381C11.6538 15.2631 11.8234 15.3333 12.0002 15.3333H20.1268L17.9402 17.52C17.8704 17.5798 17.8137 17.6533 17.7737 17.736C17.7337 17.8187 17.7112 17.9088 17.7076 18.0006C17.7041 18.0924 17.7196 18.184 17.7531 18.2695C17.7866 18.3551 17.8374 18.4328 17.9024 18.4978C17.9674 18.5627 18.0451 18.6136 18.1306 18.6471C18.2162 18.6806 18.3077 18.6961 18.3995 18.6925C18.4913 18.689 18.5814 18.6665 18.6641 18.6265C18.7469 18.5865 18.8204 18.5298 18.8802 18.46L22.6668 14.6667L18.8802 10.9Z" fill="#344054" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_110_8471">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <p className='font-[400] text-[14px] font-inter'>Exports Loan Administation</p>
                        </button>
                    </div>


                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll" id="Loan-admin">

                                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                                    <tr className=" ">
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Product Code{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Customer Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Customer Phone{' '}
                                        </th>
                                     
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            loan Amount{' '}
                                        </th>
                                      
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Tenure{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start  whitespace-nowrap">
                                            {' '}
                                            Purpose{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Status{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Reference{' '}
                                        </th>
                                        
                                        <th className="px-4 py-4 text-start text-[16px]  whitespace-nowrap">
                                            {' '}
                                            Action (s){' '}
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
                                                    {staff.loanProductCode}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.customerEmail}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.customerPhone}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.loanAmount}
                                                </td>
                                            
                                                
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.tenure}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.purpose}
                                                </td>
                                                

                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.approvalStatus}
                                                </td>
                                                <td className="px-4 py-4 text-start text-[16px] font-[400] whitespace-nowrap">
                                                    {staff.reference}
                                                </td>
                                               
                                                <td className="px-4 py-4 text-center  font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                     { staff.lienStatus && <button onClick={() => {
                                                        setOpen(true)
                                                        setApplicationId(staff.applicationId)
                                                        }} className={` bg-[#072D56]     text-[#fff] text-xs px-4 py-2 rounded-[5px] w-[150px] hover:bg-[#072D56]/[.57]    transition-colors duration-300`}>Release Lien</button>}
{/*                                                         
                                                        <Tippy content="view">
                                                        <Link
                                                            to={`/ui/LoanApproval/pendingloans/${staff.reference}`}
                                                            className="text-blue-500/[0.7] hover:text-[rgb(79,70,229)]"
                                                        >
                                                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 7C6.25 6.00544 6.64509 5.05161 7.34835 4.34835C8.05161 3.64509 9.00544 3.25 10 3.25C10.9946 3.25 11.9484 3.64509 12.6517 4.34835C13.3549 5.05161 13.75 6.00544 13.75 7C13.75 7.99456 13.3549 8.94839 12.6517 9.65165C11.9484 10.3549 10.9946 10.75 10 10.75C9.00544 10.75 8.05161 10.3549 7.34835 9.65165C6.64509 8.94839 6.25 7.99456 6.25 7ZM10 4.75C9.40326 4.75 8.83097 4.98705 8.40901 5.40901C7.98705 5.83097 7.75 6.40326 7.75 7C7.75 7.59674 7.98705 8.16903 8.40901 8.59099C8.83097 9.01295 9.40326 9.25 10 9.25C10.5967 9.25 11.169 9.01295 11.591 8.59099C12.0129 8.16903 12.25 7.59674 12.25 7C12.25 6.40326 12.0129 5.83097 11.591 5.40901C11.169 4.98705 10.5967 4.75 10 4.75Z" fill="#072D56" />
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.323 5.646C1.904 6.25 1.75 6.723 1.75 7C1.75 7.277 1.904 7.75 2.323 8.354C2.729 8.937 3.331 9.57 4.093 10.155C5.62 11.327 7.713 12.25 10 12.25C12.287 12.25 14.38 11.327 15.907 10.155C16.669 9.57 17.271 8.937 17.677 8.354C18.096 7.75 18.25 7.277 18.25 7C18.25 6.723 18.096 6.25 17.677 5.646C17.271 5.063 16.669 4.43 15.907 3.845C14.38 2.673 12.287 1.75 10 1.75C7.713 1.75 5.62 2.673 4.093 3.845C3.331 4.43 2.729 5.063 2.323 5.646ZM3.179 2.655C4.91 1.327 7.316 0.25 10 0.25C12.684 0.25 15.09 1.327 16.82 2.655C17.687 3.32 18.403 4.062 18.909 4.791C19.401 5.5 19.75 6.277 19.75 7C19.75 7.723 19.4 8.5 18.909 9.209C18.403 9.938 17.687 10.679 16.821 11.345C15.091 12.673 12.684 13.75 10 13.75C7.316 13.75 4.91 12.673 3.18 11.345C2.313 10.68 1.597 9.938 1.091 9.209C0.6 8.5 0.25 7.723 0.25 7C0.25 6.277 0.6 5.5 1.091 4.791C1.597 4.062 2.313 3.321 3.179 2.655Z" fill="#072D56" />
                                                            </svg>

                                                        </Link>
                                                    </Tippy> */}
                                                    </div>
                                                   
                                                </td>
                                                {/* <td className='relative'>
<div className="flex items-center gap-2">
<button
className="p-2 text-gray-400 hover:bg-[#1a5493] rounded-lg transition-colors"
onClick={() => handleActionClick(staff.id)}
>
<MdMoreVert size={20} />
</button>

{activeDropdown === (staff.id || idx) && (
<div
className="absolute left-1 top-12 mt-2 w-48 py-1 bg-white rounded-md shadow-lg z-10 border border-[#F2F2F2]"
ref={dropdownRef}
>
<Link
  to={`/ui/LoanApproval/pendingloans/${staff.reference}`}
  className="flex items-center justify-between px-4 py-2 text-[#667085] hover:bg-[#F8F8F8] transition-colors duration-200"
>
  <svg
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25 7C6.25 6.00544 6.64509 5.05161 7.34835 4.34835C8.05161 3.64509 9.00544 3.25 10 3.25C10.9946 3.25 11.9484 3.64509 12.6517 4.34835C13.3549 5.05161 13.75 6.00544 13.75 7C13.75 7.99456 13.3549 8.94839 12.6517 9.65165C11.9484 10.3549 10.9946 10.75 10 10.75C9.00544 10.75 8.05161 10.3549 7.34835 9.65165C6.64509 8.94839 6.25 7.99456 6.25 7ZM10 4.75C9.40326 4.75 8.83097 4.98705 8.40901 5.40901C7.98705 5.83097 7.75 6.40326 7.75 7C7.75 7.59674 7.98705 8.16903 8.40901 8.59099C8.83097 9.01295 9.40326 9.25 10 9.25C10.5967 9.25 11.169 9.01295 11.591 8.59099C12.0129 8.16903 12.25 7.59674 12.25 7C12.25 6.40326 12.0129 5.83097 11.591 5.40901C11.169 4.98705 10.5967 4.75 10 4.75Z"
      fill="#072D56"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.323 5.646C1.904 6.25 1.75 6.723 1.75 7C1.75 7.277 1.904 7.75 2.323 8.354C2.729 8.937 3.331 9.57 4.093 10.155C5.62 11.327 7.713 12.25 10 12.25C12.287 12.25 14.38 11.327 15.907 10.155C16.669 9.57 17.271 8.937 17.677 8.354C18.096 7.75 18.25 7.277 18.25 7C18.25 6.723 18.096 6.25 17.677 5.646C17.271 5.063 16.669 4.43 15.907 3.845C14.38 2.673 12.287 1.75 10 1.75C7.713 1.75 5.62 2.673 4.093 3.845C3.331 4.43 2.729 5.063 2.323 5.646ZM3.179 2.655C4.91 1.327 7.316 0.25 10 0.25C12.684 0.25 15.09 1.327 16.82 2.655C17.687 3.32 18.403 4.062 18.909 4.791C19.401 5.5 19.75 6.277 19.75 7C19.75 7.723 19.4 8.5 18.909 9.209C18.403 9.938 17.687 10.679 16.821 11.345C15.091 12.673 12.684 13.75 10 13.75C7.316 13.75 4.91 12.673 3.18 11.345C2.313 10.68 1.597 9.938 1.091 9.209C0.6 8.5 0.25 7.723 0.25 7C0.25 6.277 0.6 5.5 1.091 4.791C1.597 4.062 2.313 3.321 3.179 2.655Z"
      fill="#072D56"
    />
  </svg>
  <p className="text-[16px] font-[400]">View Loan</p>
</Link>

<div className='p-4'>
<button
  onClick={() => bookandUnbook(staff.reference, staff.bookStatus)}
  className={`w-full px-4 py-2 text-xs rounded-[25px] transition-colors duration-200 ${
    staff.bookStatus === "Booked"
      ? "bg-[#E2FFF1] border-2 border-[#0FA958] text-[#000000] hover:bg-green-500/[.57]"
      : "bg-[#FFE8EA] border-2 border-[#DC3545] text-[#000000] hover:bg-red-500/[.57]"
  }`}
>
  {staff.bookStatus === "Booked" ? "Unbook" : "Book"}
</button>
</div>

</div>
)}
</div>
</td> */}
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
                        <div>
                            {pageNumber + 1} / {totalPages}
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

export default LienAdministration