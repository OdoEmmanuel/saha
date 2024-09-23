import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { fixedDeposit } from '../../services';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { Formik, useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";
import { Description } from '@headlessui/react';

const UpdateDeposits = () => {
    const { id } = useParams()
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const navigate = useNavigate()

    setHeaders('UPDATE FIXED DEPOSIT')


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
        setisLoading(true)
        axios.get(`${middleware}fixed-deposit-setup/${id}`,config)
        .then((res)=>{
            console.log(res.data.data)
            const userData = res.data.data
            formik.setValues({
                fixedDeposit: userData.fixedDepositType,
                description: userData.description,
                tenure:userData.tenure,
                minAmount: userData.minAmount,
                maxAmount:userData.maxAmount,
                rate: userData.rate,
                tax: userData.tax,
                taxDeductible: userData.taxDeductible,
                available: userData.available      

            })
        })
        .catch((e) => {
            console.log(e.response.data.responseMessage)

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
    },[])


    const formik = useFormik({
        initialValues: {
            fixedDeposit: '',
            description: '',
            tenure: 0,
            minAmount: 0,
            maxAmount: 0,
            rate:0,
            tax:0,
            taxDeductible:false,
            available:false

        },
        validationSchema: fixedDeposit,
        onSubmit: (values) => {
            setisLoading(true)
            
            

        }
    })
  return (
    <div>UpdateDeposits</div>
  )
}

export default UpdateDeposits