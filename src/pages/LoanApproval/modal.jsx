import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import { UilTimes } from '@iconscout/react-unicons'

const Modal = ({id,func,status}) => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const [isLoading, setisLoading] = useState(false);
    const [comment,setComment] = useState('')
    const [error,setError] = useState('')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    const handleSubmit =  async ()=> {
        const requestbody = {
            comment: comment,
            approvalReference: id,
            approvalAction: status,
          }
        axios.post(`${middleware}property/lien/release?applicationId=${id}&comment=${comment}`,null,config)
        .then((res) => {
            toast.success(res.data.responseMessage)
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
            func()
        })
    }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center  bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex justify-between">
        <div>
          <h4 className=" mb-2 dark:text-gray-300">
            Release Lien Comment
          </h4>
        </div>
        <button
          type="button"
          className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all  dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
          onClick={() => func()}
        >
          <span className="sr-only">Close</span>
          <UilTimes size={24} />
        </button>
      </div>

      <div>
        <label className="font-semibold">comment</label>
        <textarea
          className="p-2 w-full border border-gray-200 mt-2 mb-6 h-20"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
            setError('')
            
          }}
        />
        {error && <p className="text-red-500 ">{error}</p>}
      </div>
      <div className="flex gap-4 justify-end mt-6 w-full">
        <button onClick={() => func()} className='bg-red-500 text-white text-lg px-8 py-2 rounded-md hover:bg-red-500/[.57] transition-colors duration-300'>
             Cancel
        </button>
          <button
            className="bg-green-500 text-white text-lg px-8 py-2 rounded-md hover:bg-green-500/[.57] transition-colors duration-300"
            type="submit"
            onClick={handleSubmit}
          >
         
            {isLoading ? 'loading...':'Realse Lien'}
            {/* {loading ? 'loading...' : 'submit'} */}
          </button>
        </div>
    </div>
  </div>
  )
}

export default Modal