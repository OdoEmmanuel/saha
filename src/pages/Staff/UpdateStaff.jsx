import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { CreateStaffs } from '../../services';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { Formik, useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";


const UpdateStaff = () => {
    const { id } = useParams()
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [data, setData] = useState([])
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const navigate = useNavigate()

    setHeaders('Update Staff')
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
        axios.get(`${authorizationService}user/${id}`, config)
            .then((res) => {
                const userData = res.data.data;
                formik.setValues({
                    email: userData.email || '',
                    Name: userData.staffName || '',
                    phone: userData.phone || '',
                    lang: userData.lang || '',
                    userType: userData.userType || ''
                });
            }
             )
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
            }).finally(() => {
                setisLoading(false)
            })
    }, [])

    useEffect(() => {
        const api1 = axios.get(`${authorizationService}user/languages`, config)
        const api2 = axios.get(`${authorizationService}user/types`, config)

        setisLoading(true)

        Promise.all([api1, api2]).then(([response1, response2]) => {
            setLanguages(response1.data.data)
            setUserType(response2.data.data)
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

    const lang = languages.map((item) => {
        return {
            label: item.lang,
            value: item.key
        }
    })

    const type = userType.map((item) => {
        return {
            label: item,
            value: item
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            Name: '',
            phone: '',
            lang: '',
            userType: ''

        },
        validationSchema: CreateStaffs,
        onSubmit: (values) => {
            setisLoading(true)
            const body = {
                companyCode: fetchCompanyCode,
                email: values.email,
                staffName: values.Name,
                phone: values.phone,
                userType: values.userType,
                lang: values.lang
            }
            axios.put(`${authorizationService}user/update`, body, config)
                .then((res) => {
                 
                    toast.success(res.data.responseMessage)
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
        <div className=" px-8 py-4 ">
              {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
        <div className="max-w-md mx-auto bg-white rounded-lg  shadow-xl overflow-hidden">
        <div className="px-6 py-4">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
          <BiArrowBack className="mr-2" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Staff</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-1 gap-4'>

          <InputField2
                  label={`Email`}
                  name={`email`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email}
                  errorText={formik.errors.email}

              />

              <InputField2
                  label={`First Name`}
                  name={`Name`}
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  error={formik.touched.Name && formik.errors.Name}
                  errorText={formik.errors.Name}

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
                  name={`lang`}
                  options={lang}
                  onChange={formik.handleChange}
                  value={formik.values.lang}
                  error={formik.touched.lang && formik.errors.lang}
                  errorText={formik.errors.lang}
              
              />
              <SelectField
                label={`Staff Type`}
                name={`userType`}
                options= {type}
                onChange={formik.handleChange}
                value={formik.values.userType}
                error={formik.touched.userType && formik.errors.userType}
                errorText={formik.errors.userType}
              
              />
      
          </div>
          <button type='submit' className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....':'Update Staff'}</button>
      </form>
        </div>
    

  </div>
  </div>
    )
}

export default UpdateStaff