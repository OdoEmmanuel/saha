import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import ViewPendingHeader from './ViewPendingHeader';
import ViewPendingCustomer from './ViewPendingCustomer';
import ViewPendingKin from './ViewPendingKin';
import ViewPendingDocument from './ViewPendingDocument';
import ConfirmationModal from './ConfirmationModal';

const ViewPendingKycdetail = () => {
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
        axios.get(`${middleware}kyc/getCustomerKycInformation?customerId=${id}`,config)
        .then((res) => {
             console.log(res.data.data.customerKYCDetails)
             setdata(res.data.data.customerKYCDetails || [])
             setKyc(res.data.data.kycDocumentsDetails || [])
        }).catch((e) => {
            // console.log(e.response.data.responseMessage)
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
    <div className='flex flex-col'>
        {openModal && <ConfirmationModal func={close} id={id}/>}
             {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <ViewPendingHeader id={id} func={open}/>
            <Routes>
                <Route path={'/'} element={<ViewPendingCustomer dat={data}/>} />
                <Route path={'/kin'} element={<ViewPendingKin  dat={data}/>} />
                <Route path={'/documents'} element={<ViewPendingDocument kycs={kyc} />} />
            </Routes>
        </div>
  )
}

export default ViewPendingKycdetail