import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../../common/context/useAuthContext';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';

// import ViewCustomer from './ViewCustomer';
import PropertyHeader from './PropertyHeader';
import GetPropertiesDocument from './GetPropertiesDocument';
import GetPropertiesUser from './GetPropertiesUser';

const GetPropertDetail = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [data, setdata] = useState({})
  const [kyc, setKyc] = useState([])
  const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    const open = () => {
      setOpenModal(true)
    }
  
    const close = () => {
      setOpenModal(false)
    }

    const { id } = useParams()
    setHeaders('Pending KYC Details')

    useEffect(() => {
        setisLoading('true')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                "request-source": request,
                "Username": email,
                'client-id': clientid,
            },
        }
        axios.get(`${middleware}property/${id}`,config)
        .then((res) => {
        
             setdata(res.data.data)
             setKyc(res.data.data.documents || [])
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
        }).finally(() => {
            setisLoading(false)
        })
    }, [])
  return (
    <div className='flex flex-col p-8 '>
   
         {isLoading && (
            <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                {" "}
                <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
            </div>
        )}
        <PropertyHeader id={id} func={open}/>
        <Routes>
            <Route path={'/'} element={<GetPropertiesUser dat={data}/>} />
            <Route path={'/document'} element={<GetPropertiesDocument  kycs={kyc}/>} />
            
        </Routes>
    </div>
  )
}

export default GetPropertDetail