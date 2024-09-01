import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { addStaff } from '../../services';
import { useNavigate, Link } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';

const AddStaff = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    setHeaders('Add Staff')

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
        const api1 = axios.get(`${authorizationService}user/languages`, config)
        const api2 = axios.get(`${authorizationService}user/types`, config)

        setisLoading(true)

        Promise.all([api1, api2]).then(([response1, response2]) => {
            setLanguages(response1.data.data)
            setUserType(response2.data.data)
        }).catch((e) => {
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
        }).finally(() => {
            setisLoading(true)
        })
    }, [])

    const lang = languages.map((item) => {
        return {
            label:item.lang,
            value:item.key
        }
    })

    const type = userType.map((item) => {
        return {
            label:item,
            value:item
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            lang: '',
            userType:''

        },
        validationSchema: addStaff,
        onSubmit: (values) => { }
    })
    return (
        <div className="flex  items-center justify-center lg:mt-0 mt-5">
            <form className='bg-[#fff] rounded-lg shadow-md p-4 w-[500px] '>
                <div className='flex flex-col gap-4'>

                    <InputField2
                        label={`First Name`}
                        name={`firstName`}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && formik.errors.firstName}
                        errorText={formik.errors.firstName}

                    />

                    <InputField2
                        label={`Last Name`}
                        name={`Last Name`}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && formik.errors.lastName}
                        errorText={formik.errors.lastName}

                    />
                    <InputField2
                        label={`Phone`}
                        name={`Phone`}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && formik.errors.phone}
                        errorText={formik.errors.phone}
                    />
                    <SelectField
                        label={`Language`}
                        options={lang}
                        onChange={formik.handleChange}
                        value={formik.values.lang}
                        error={formik.touched.lang && formik.errors.lang}
                        errorText={formik.errors.lang}
                    
                    />
                    <SelectField
                      label={`Staff Type`}
                      options= {type}
                      onChange={formik.handleChange}
                      value={formik.values.userType}
                      error={formik.touched.userType && formik.errors.userType}
                      errorText={formik.errors.userType}
                    
                    />

                    <div className='flex justify-between'>
                        <div></div>
                        <button  className="text-white btn bg-blue-500  hover:bg-blue-700 rounded-[10px] px-5 py-2"  > Approve Kyc</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AddStaff