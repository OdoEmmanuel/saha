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
     const [product, setProduct] = useState([])
        const [tenure, setTenure] = useState([])

    const navigate = useNavigate()

    setHeaders('Update Fixed Deposit')


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
        axios.get(`${middleware}fixed-deposit-setup/${id}`, config)
            .then((res) => {
        
                const userData = res.data.data
                formik.setValues({
                    
                    fixedDepositType: userData.fixedDepositType,
                    description: userData.description,
                    tenure: userData.tenure,
                    minAmount: userData.minAmount,
                    maxAmount: userData.maxAmount,
                    rate: userData.rate,
                    tax: userData.tax,
                    isTaxDeductible: userData.taxDeductible,
                    isAvailable: userData.available

                })
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

       useEffect(() => {
            const api1 = axios.get(`${middleware}loan/tenure`, config)
            const api2 = axios.get(`${middleware}loan/products/all`, config)
    
            setisLoading(true)
    
            Promise.all([api1, api2]).then(([response1, response2]) => {
                setTenure(response1.data.data)
                setProduct(response2.data.data)
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


    const formik = useFormik({
        initialValues: {
            fixedDepositType: '',
            description: '',
            tenure: 0,
            minAmount: 0,
            maxAmount: 0,
            rate: 0,
            tax: 0,
            isTaxDeductible: false,
            isAvailable: false

        },
        validationSchema: fixedDeposit,
        onSubmit: (values,{resetForm}) => {
            setisLoading(true)
            axios.put(`${middleware}fixed-deposit-setup/${id}`, values, config)
                .then((res) => {
                    toast.success(`${res.data.responseMessage}`)
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
                })
                .finally(() => {
                    setisLoading(false)
                })


        }
    })
    return (
        <div className=" bg-gray-100 ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className="max mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Fixed Deposit</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid lg:grid-cols-3 grid-cols-2 gap-6'>

                            <InputField2
                                label={`Fixed Deposit Type`}
                                name={`fixedDepositType`}
                                value={formik.values.fixedDepositType}
                                onChange={formik.handleChange}
                                error={formik.touched.fixedDepositType && formik.errors.fixedDepositType}
                                errorText={formik.errors.fixedDepositType}

                            />

                            <InputField2
                                label={`Description`}
                                name={`description`}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && formik.errors.description}
                                errorText={formik.errors.description}

                            />


                            <InputField2
                                label={`Tenure`}
                                name={`tenure`}
                                value={formik.values.tenure}
                                type={'number'}
                                onChange={formik.handleChange}
                                error={formik.touched.tenure && formik.errors.tenure}
                                errorText={formik.errors.tenure}
                            />

                            <InputField2
                                label={`Min Amount`}
                                name={`minAmount`}
                                value={formik.values.minAmount}
                                type={'number'}
                                onChange={formik.handleChange}
                                error={formik.touched.minAmount && formik.errors.minAmount}
                                errorText={formik.errors.minAmount}
                            />

                            <InputField2
                                label={`Max Amount`}
                                name={`maxAmount`}
                                value={formik.values.maxAmount}
                                type={'number'}
                                onChange={formik.handleChange}
                                error={formik.touched.maxAmount && formik.errors.maxAmount}
                                errorText={formik.errors.maxAmount}
                            />


                            <InputField2
                                label={`Rate`}
                                name={`rate`}
                                value={formik.values.rate}
                                type={'number'}
                                onChange={formik.handleChange}
                                error={formik.touched.rate && formik.errors.rate}
                                errorText={formik.errors.rate}
                            />

                            <InputField2
                                label={`Tax`}
                                name={`tax`}
                                value={formik.values.tax}
                                type={'number'}
                                onChange={formik.handleChange}
                                error={formik.touched.tax && formik.errors.tax}
                                errorText={formik.errors.tax}
                            />

                            





                        </div>
                        <div className='flex items-center mt-6'>
                                <div className='flex items-center justify-between '>
                                    <div className='flex items-center mr-4'>
                                        <label className='mr-2'>Tax Deductible</label>
                                        <input className='w-5 h-5' type='checkbox' name={`isTaxDeductible`} checked={formik.values.isTaxDeductible} onChange={formik.handleChange} />
                                    </div>
                                    <div className='flex items-center'>
                                        <label className='mr-2'>Available</label>
                                        <input className='w-5 h-5' type='checkbox' name={`isAvailable`} checked={formik.values.isAvailable} onChange={formik.handleChange} />
                                    </div>
                                </div>

                            </div>
                        <button type='submit' className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Update Fixed Deposit'}</button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default UpdateDeposits