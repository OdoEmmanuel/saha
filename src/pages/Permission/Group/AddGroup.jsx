import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { group } from '../../../services';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { Formik, useFormik } from "formik";
import InputField2 from '../../../components/InputField2';
import SelectField from '../../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";

const AddGroup = () => {
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

    setHeaders('Add Group')

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
      groupName: '',
      description: '',
    },
    validationSchema: group,
    onSubmit: (values,{ resetForm }) => {
      setisLoading(true)

      axios.post(`${authorizationService}group/create`, {...values, companyCode:fetchCompanyCode}, config)
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
      <div className="px-6 py-4">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
          <BiArrowBack className="mr-2" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Group</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-4'>

            <InputField2
              label={`Group Name`}
              name={`groupName`}
              value={formik.values.groupName}
              onChange={formik.handleChange}
              error={formik.touched.groupName && formik.errors.groupName}
              errorText={formik.errors.groupName}

            />

            <InputField2
              label={`Description`}
              name={`description`}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
              errorText={formik.errors.description}

            />

          </div>
          <button type='submit' className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Add Group'}</button>
        </form>
      </div>


    </div>
  </div>
  )
}

export default AddGroup