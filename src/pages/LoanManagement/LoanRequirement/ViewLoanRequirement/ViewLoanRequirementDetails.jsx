import { useAuthContext } from "../../../../common/context/useAuthContext";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import ViewLoanRequirementHeader from "./ViewLoanRequirementHeader";
import ViewLoanRequirementLoanDetails from "./ViewLoanRequirementLoanDetails";
import ViewLoanRequirementFilled from "./ViewLoanRequirementFilled";

const ViewLoanRequirementDetails = () => {
    let { id } = useParams()
    const [data, setdata] = useState({})
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()

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
        setisLoading(true)
        axios.get(`${middleware}loan/requirements/${id}/detail`,config)
        .then((res) =>{
            setdata(res.data.data)
        })
        .catch((e) => {
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
    },[])
  return (
    <div className='flex flex-col'>
          {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <ViewLoanRequirementHeader id={id}  />
            <Routes>
                <Route path={'/'} element={<ViewLoanRequirementLoanDetails data={data}/>} />
                <Route path={'/filled'} element={<ViewLoanRequirementFilled  data={data}/>} />
            </Routes>
    </div>
  )
}

export default ViewLoanRequirementDetails