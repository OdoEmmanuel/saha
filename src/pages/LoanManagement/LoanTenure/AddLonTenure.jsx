import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { useFormik } from "formik";
import InputField2 from '../../../components/InputField2';
import SelectField from '../../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";
import { loanTenure } from '../../../services';

const CreateLonTenure = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    setHeaders('Create Loan Tenure')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    const formik = useFormik({
        initialValues: {
            tenure: 0,
            description: ''
        },
        validationSchema: loanTenure,
        onSubmit: (values,{ resetForm} ) => {
            axios.post(`${middleware}loan/tenure/create`, values, config)
                .then((res) => {
                    
                    toast.success(res.data.responseMessage)
                    resetForm()
                    

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
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Loan Tenure</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <InputField2
                            label="Tenure"
                            name="tenure"
                            type="number"
                            value={formik.values.tenure}
                            onChange={formik.handleChange}
                            error={formik.touched.tenure && formik.errors.tenure}
                            errorText={formik.errors.tenure}
                        />
                        <InputField2
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && formik.errors.description}
                            errorText={formik.errors.description}
                        />

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white bg-[#072D56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Createing...' : 'Create Loan Tenure'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateLonTenure