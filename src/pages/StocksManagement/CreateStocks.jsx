import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { AllStocks } from '../../services';
import { useNavigate, Link } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";

const CreateStocks = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const [stocks,setStocks] = useState([])
    const navigate = useNavigate()


    setHeaders('Create Stocks')

    useEffect(()=>{
        const fetchData = async () => {
            try {
              setisLoading(true)
              const token = localStorage.getItem('token')
              const email = localStorage.getItem('email')
              const response = await fetch(
                `${middleware}stock/available`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    "request-source":request,
                    "Username": email,
                    'client-id': clientid,
                  },
                }
              )
              const data = await response.json()
              console.log(data.data)
            //   setTotalPages(data.data.users.totalPages)
        
        
              if(!response.ok){
                throw error
              }
        
              if(data.responseCode === '400' || data.responseCode === '417'){
                if(data.responseMessage === 'Invalid/Expired Token' || data.responseMessage ==='Invalid Token' || data.responseMessage === 'Login Token Expired'){
                  setLoading(false)
                  toast.error(data.responseMessage)
                  navigate('/auth/login')
                }else if (data.responseMessage === 'Insufficient permission') {
                  toast.error(data.responseMessage)
                  navigate('/')
                }
                else{
                  toast.error(data.responseMessage)
                  setisLoading(false)
                }
              }
              else if (data.responseCode === '500') {
                if (data.responseMessage === "System Malfunction") {
                  toast.error(data.responseMessage)
                }
                else{
                  toast.error(data.responseMessage)
                }
              }
             
        
              
              setisLoading(false)
              setStocks(data.data)
            } catch (error) {
              console.error('Error fetching data:', error)
            }
          }

          fetchData()
    },[])

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

    const lang = stocks.map((item) => {
        return {
            label: item.symbolId,
            value: item.symbolId
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
            stockCode: '',
            isAllowed: false

        },
        validationSchema: AllStocks,
        onSubmit: (values, { resetForm }) => {
            setisLoading(true)

            axios.post(`${middleware}stock`, values, config)
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
        <div className=" px-8 py-4">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className="max-w-md mx-auto bg-white rounded-[10px] shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Stocks</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-1 gap-4'>





                            <SelectField
                                label={`Stock Code`}
                                name={`stockCode`}
                                options={lang}
                                onChange={formik.handleChange}
                                value={formik.values.stockCode}
                                error={formik.touched.stockCode && formik.errors.stockCode}
                                errorText={formik.errors.stockCode}

                            />
                            <div className='flex items-center gap-x-6'>

                                <div className="flex items-center gap-x-2 mb-6">
                                    <label
                                        className="form-check-label font-semibold"
                                        htmlFor="customCheck3"
                                    >
                                        Is Allowed
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox rounded text-primary"
                                        id="customCheck3"
                                        name={`isAllowed`}
                                        checked={formik.values.isAllowed}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>




                        </div>


                        <button type='submit' className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Create Stocks'}</button>

                    </form>
                </div>


            </div>
        </div>

    )
}

export default CreateStocks