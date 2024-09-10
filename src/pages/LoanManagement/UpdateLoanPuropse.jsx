import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link,useParams } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";
import { loanPurpose } from '../../services';

const UpdateLoanPuropse = () => {

    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate(-1)

    const { id } = useParams()


    setHeaders('Update Loan Purpose')

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
        axios.get(`${middleware}loan/purpose/${id}`,config)
        .then((res) => {
            console.log(res.data.data)
            const userData = res.data.data
            formik.setValues({
                description:userData.description,
                purpose: userData.purpose
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
        initialValues:{
            description:'',
            purpose:''
        },
        validationSchema:loanPurpose,
        onSubmit:(values)=>{
            axios.post(`${middleware}loan/purpose/create`,values,config)
            .then((res) => {
                toast.success(res.data.responseData.responseMessage)
                
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
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-blue-500 hover:text-blue-600 transition-colors">
          <BiArrowBack className="mr-2" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Loan Purpose</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <InputField2
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && formik.errors.description}
            errorText={formik.errors.description}
          />
          <InputField2
            label="Purpose"
            name="purpose"
            value={formik.values.purpose}
            onChange={formik.handleChange}
            error={formik.touched.purpose && formik.errors.purpose}
            errorText={formik.errors.purpose}
          />
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Update Loan Purpose'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UpdateLoanPuropse