import { useAuthContext } from "../../common/context/useAuthContext";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';


const ViewStock = () => {
  let { id } = useParams()
  const [data, setdata] = useState({})
  const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
  const [isLoading, setisLoading] = useState(false);
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  setHeaders('Stocks Details')


  
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


  const formatDateString = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`

  }

  useEffect(() => {
      axios.get(`${middleware}stock/${id}`, config)
          .then((res) => {
              setdata(res.data.data)
              console.log(res.data.data)
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
                  <h1 className=' font-[500] text-[25px]'>Stock Details</h1>
              </div>

          </div>

          <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
              <div className="mb-4 ">
                  <h4 className=" mb-6 dark:text-gray-400   text-gray-900">
                      Stock Name
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {data?.stockName || '----'}
                  </h4>
              </div>
              <div className="mb-4">
                  <h4 className=" mb-6 dark:text-gray-400   text-gray-900 ">
                      Stock Code
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {data.stockCode}
                  </h4>
              </div>
              <div className="mb-4">
                  <h4 className=" mb-6   dark:text-gray-700   text-gray-900 ">
                      Stock Id
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {data?.id}
                  </h4>
              </div>
              <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                      Is Allowed
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {data?.isAllowed === true ? 'Yes':'No' }
                  </h4>
              </div>
              <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                      Created By
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {data?.createdBy || '----'}
                  </h4>
              </div>
              <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500 ">
                      Created At
                  </h4>
                  <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                      {formatDateString(data.createdAt)}
                  </h4>
              </div>
           
          </div>
      </div>
  )
}

export default ViewStock