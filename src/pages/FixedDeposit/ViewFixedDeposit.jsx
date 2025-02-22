import { useAuthContext } from "../../common/context/useAuthContext";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import FixedModal from "./FixedModal";


const ViewFixedDeposit = () => {
    let { id } = useParams()
    const [data, setdata] = useState({})
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    setHeaders('Fixed Deposit Details')


    
  const open = () => {
    setOpenModal(true)
  }

  const close = () => {
    setOpenModal(false)
  }


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            "request-source": request,
            "Username": email,
            'client-id': clientid,
        },
    }


    useEffect(() => {
        axios.get(`${middleware}fixed-deposit-setup/${id}`, config)
            .then((res) => {
                setdata(res.data.data)
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
    }, [])
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className="flex items-center mb-8 justify-between">
                {openModal && <FixedModal func={close} id={data.id}/>}
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="33"
                            height="33"
                            viewBox="0 0 33 33"
                            fill="none"
                            className="svg"
                        >
                            <path
                                d="M8.29289 16.2929C7.90237 16.6834 7.90237 17.3166 8.29289 17.7071L14.6569 24.0711C15.0474 24.4616 15.6805 24.4616 16.0711 24.0711C16.4616 23.6805 16.4616 23.0474 16.0711 22.6569L10.4142 17L16.0711 11.3431C16.4616 10.9526 16.4616 10.3195 16.0711 9.92893C15.6805 9.53841 15.0474 9.53841 14.6569 9.92893L8.29289 16.2929ZM25 16L9 16V18L25 18V16Z"
                                fill="#000"
                            />
                            <circle cx="16.5" cy="16.5" r="16" stroke="#000" />
                        </svg>
                    </button>
                    <h1 className=' font-[500] text-[25px]'>Fixed Deposit Details</h1>
                </div>
               <button className="bg-[#DC3545] text-white py-3 px-8 rounded-lg" onClick={open}> Delete</button>
            </div>

            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-6 dark:text-gray-400   text-gray-900">
                        Fixed Deposit Type
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.fixedDepositType || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-400   text-gray-900 ">
                        Available
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data.available === true ? 'Yes' : 'No'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6   dark:text-gray-700   text-gray-900 ">
                        Description
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.description || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500  ">
                        Max Amount
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.maxAmount || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500  ">
                        Min Amount
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.minAmount || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500 ">
                        Rate
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.rate || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500 ">
                        Tax
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.tax || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500  ">
                        Tax Deductible
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data.taxDeductible ? 'Yes' : 'No'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500  ">
                        Tenure
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.tenure || '----'}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default ViewFixedDeposit