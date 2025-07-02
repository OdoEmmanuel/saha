import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';

// import ViewCustomer from './ViewCustomer';
import ViewLoanDetails from './ViewPendingLoanDetails';
import ViewUserDetails from './ViewPendingUserDetails';
import ViewLoanDocuments from './ViewPendingLoanDocuments';
import AllLoanHeader from './PendingLoanHeader';
import Modal from './Modal';
import ViewPendingCollateral from './ViewPendingCollateral';

const PendingLoanDetails = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [data, setdata] = useState({})
     const[collaterals,setCollaterals] =useState([])
        const [status,setStaus] = useState()
  const [kyc, setKyc] = useState([])
  const [approvalStatus, setApprovalStatus] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()

    const { id } = useParams()
    setHeaders('Pending Loan Details')

  

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
        axios.get(`${middleware}loan/${id}/details`,config)
        .then((res) => {
            
            setdata(res.data.data)
            setCollaterals(res.data.data.collaterals)
            setStaus(res.data.data.lienStatus)
            setCustomerId(res.data.data.customerId)

             
             
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
        <div className='flex flex-col p-8'>
           
             {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <AllLoanHeader id={id} func={open} customerId={customerId} />
            <Routes>
                <Route path={'/'} element={<ViewLoanDetails dat={data} status={status}/>} />
                <Route path={'/user'} element={<ViewUserDetails  dat={data}/>} />
                <Route path={'/documents'} element={<ViewLoanDocuments data={data} />} />
                <Route path={'/collaterals'} element={<ViewPendingCollateral data={collaterals} />} />
            </Routes>
        </div>
    )
}

export default PendingLoanDetails