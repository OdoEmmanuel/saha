import React, { useState } from 'react'
import { UilTimes } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../common/context/useAuthContext'
import axios from 'axios'

const ResolveComplaintModal = ({ func, id }) => {

  const { middleware, authorizationService, request, clientid } = useAuthContext()
  const [complaintStatus, setComplaintStatus] = useState('')
  const [complaintResponse, setComplaintResponse] = useState('')
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  const handleResolveCompliant = async () => {
    if (response) {
      try {
        setLoading(true)
        const requestBody = {
          complaintResponse: complaintResponse,
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email,
            'client-id': clientid,
          }
        }
        const result = await axios.put(
          `${middleware}complaint/resolve?complaintId=${id}`,
          requestBody,
          config
        )
        setLoading(false)
        setComplaintResponse('')
        toast.success(`${result.data.data.responseData}`)
        func()
      } catch (e) {
        setLoading(false)
        setComplaintResponse('')
        func()
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
      }
    }
  }


  const handleStatusChange = async () => {
    if (status) {
      setLoading(true)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email,
            'client-id': clientid,
          }
        }
        const result = await axios.put(
          `${middleware}complaint/status?complaintId=${id}&complaintStatus=${complaintStatus}`,
          {},
          config
        )
        setLoading(false)
        setComplaintStatus('')
        toast.success(`${result.data.data.responseData}`)
        func()
      } catch (error) {
        setLoading(false)
        setComplaintStatus('')
       
        if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
          toast.error(e.response.data.responseMessage)
          navigate('/auth/login')
          localStorage.clear()
          func()
        }
        else if (e.response.data.responseMessage === 'Insufficient permission') {
          toast.error(e.response.data.responseMessage)
          navigate('/')
          func()
        }
        else {
          toast.error(e.response.data.responseMessage)
          func()
        }
      }
    }
  }

  const handleErrorResponse = (error) => {
    const responseMessage = error.response?.data?.responseMessage
    if (
      responseMessage === 'Invalid/Expired Token' ||
      responseMessage === 'Invalid Token' ||
      responseMessage === 'Login Token Expired'
    ) {
      toast.error(responseMessage)
      localStorage.clear()
      func()
      navigate('/auth/login')
    } else if (responseMessage === 'Insufficient permission') {
      toast.error(responseMessage)
      func()
      navigate('/')
    } else {
      toast.error(responseMessage || 'An error occurred')
      func()
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
        <div className="flex justify-between">
          <div>
            <h4 className=" mb-2 dark:text-gray-300">
              Resolve Complaint
            </h4>
          </div>
          <button
            type="button"
            className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all  dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
            onClick={func}
          >
            <span className="sr-only">Close</span>
            <UilTimes size={24} />
          </button>
        </div>

        {/* <div className="w-full mb-4">
          <label className="font-semibold">Complaint Status</label>
          <select
            className="p-2 w-full border border-gray-200"
            value={complaintStatus}
            onChange={(e) => {
              setComplaintStatus(e.target.value)
              setError('')
              setStatus(true)
            }}
          >
            <option value="">Select status</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="OPEN">OPEN</option>
          </select>
          {error && <p className="text-red-500 ">{error}</p>}
        </div> */}

        <div>
          <label className="font-semibold">Complaint Response</label>
          <textarea
            className="p-2 w-full border border-gray-200 mt-2 mb-2 h-32"
            value={complaintResponse}
            onChange={(e) => {
              setComplaintResponse(e.target.value)
              setError('')
              setResponse(true)
            }}
          />
          {error && <p className="text-red-500 ">{error}</p>}
        </div>
        <div className="flex gap-4 justify-end mt-6 w-full">
          <button
            className="bg-[#072D56] rounded-lg p-3 text-white w-full"
            type="submit"
            onClick={handleResolveCompliant}
          >
            {loading ? 'loading...' : 'update response'}
          </button>
          {/* <button
            className="btn bg-[#072D56] rounded-lg p-3 text-white w-full"
            type="submit"
            onClick={handleStatusChange}
          >
            {loading ? 'loading...' : 'update status'}
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default ResolveComplaintModal