import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import { UilTimes } from '@iconscout/react-unicons'

const ApprovalModal = ({func,id}) => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const [comment, setComment] = useState('')
    const [status, setStatus] = useState('')
    const [isLoading, setisLoading] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            "request-source": request,
            "Username": email,
            'client-id': clientid,
        },
    }

    
    const approveKyc = () => {
        setisLoading(true)
        const requestbody = {
            comment: comment,
            id: id,
            approvalAction: status,
          }
        axios.post( `${authorizationService}approvals/requests/approve`,requestbody,config)
        .then((res) => {
            toast.success(res.data.responseMessage)
            navigate(-1)
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
        }).finally(() => {
            setisLoading(false)
            func()
        })
    }
  return (
    <div className="fixed top-0 left-0 w-screen  h-screen z-60  flex items-center justify-center bg-black bg-opacity-50 width-50" >
    <div className="bg-white p-10 rounded-lg w-[40%] mx-auto">
      <div className="flex justify-between">
        <div>
          <h4 className="uppercase mb-2 dark:text-gray-300">
            Approval Comment
          </h4>
        </div>
        <button
          type="button"
          className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
          onClick={() => func()}
        >
          <span className="sr-only">Close</span>
          <UilTimes size={24} />
        </button>
      </div>

      <div className='flex mb-2 mt-2'>
        {/* <label className="font-semibold">Status</label> */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
          }}
          className=" rounded-[10px] border-2 p-2 w-full"
        >
          <option value="">Select User Type</option>
          <option value="Approve">Approve</option>
          <option value="Reject">Reject</option>
        </select>
      </div>
      <label className="font-semibold">Comment</label>

      <div>
        <textarea
          className="p-2 w-full border border-gray-200 mt-2 mb-6 h-20"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
            
          }}
        />
      </div>
      <div className="flex gap-4 justify-end mt-6 w-full">
        <button onClick={() => func()} className='bg-red-500 text-white text-lg px-8 py-2 rounded-md hover:bg-red-500/[.57] transition-colors duration-300'>
             Cancel
        </button>
          <button
            className="bg-green-500 text-white text-lg px-8 py-2 rounded-md hover:bg-green-500/[.57] transition-colors duration-300"
            type="submit"
            onClick={approveKyc}
          >
         
            {isLoading ? 'loading...':'Delete'}
            {/* {loading ? 'loading...' : 'submit'} */}
          </button>
        </div>
    </div>
  </div>
  )
}

export default ApprovalModal