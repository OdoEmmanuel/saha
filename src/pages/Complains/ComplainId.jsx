import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { ComplianType } from '../../services';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";
import ResolveComplaintModal from './ResolveComplaintModal';


const ComplainId = () => {
    const { id } = useParams()
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [complaintStatus, setComplaintStatus] = useState('')
    const [userType, setUserType] = useState([])
    const [data, setData] = useState({})
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const navigate = useNavigate()
    const [openModel, setOpenModal] = useState(false)
    const [status, setStatus] = useState(false)



    const close = () => {
        setOpenModal(false)
    }

    setHeaders('View Complains')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    const convertDateToString = (dateArray) => {
        // Given date components
        const dateComponents = dateArray;

        // Create a Date object
        const date = new Date(...dateComponents.slice(0, 6)); // Year, month, day, hour, minute, second

        // Format the date into a string
        const twoDigitDay = ('0' + date.getDate()).slice(-2);
        const twoDigitMonth = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
        const year = date.getFullYear();

        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        const dateString = `${twoDigitDay}-${twoDigitMonth}-${year} ${hours}:${minutes}:${seconds}`;
        return dateString;
    };

    useEffect(() => {
        setisLoading(true)
        axios.get(`${middleware}complaint/?complaintId=${id}`, config)
            .then((res) => {
                const userData = res.data.data.complaint;
                console.log(userData)
                setData(userData)
                formik.setValues({
                    complaintType: userData.complaintType,
                    complaintDate: userData.createdDate,
                    complaintStatus: userData.complaintStatus,
                    compliantDescription: userData.complaintDescription,
                    compliantResponse: userData.complaintResponse || null,
                    complaintResponseDate: convertDateToString(userData.complaintResponseDate) || null
                });
            }
            )
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
            }).finally(() => {
                setisLoading(false)
            })
    }, [])


    const handleStatusChange = async (value) => {

        if(value.trim()){
            setisLoading(true)
            setComplaintStatus(value)
       
            if(value === "RESOLVED"){
                setOpenModal(true)
                setisLoading(false)
            }

            else{
                try {
                    const config = {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'request-source': request,
                        'Username': email,
                        'client-id': clientid,
                      }
                    }
                    const result = await axios.put(
                      `${middleware}complaint/status?complaintId=${id}&complaintStatus=${value}`,
                      {},
                      config
                    )
                    setisLoading(false)
                  
                    toast.success(`${result.data.data.responseData}`)
                    
                  } catch (e) {
                    setisLoading(false)
                    
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
                  }
            }
            
        }else{
            toast.info("select a complain status")
        }
        
         
    
      }

      function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }

   

    const formik = useFormik({
        initialValues: {
            complaintType: '',
            complaintDate: '',
            complaintStatus: '',
            compliantDescription: '',
            compliantResponse: '',
            complaintResponseDate: ''

        },
        validationSchema: ComplianType,
        onSubmit: (values) => {


        }
    })
    return (
        <div className=" bg-gray-100 m-8 ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            {openModel && (<ResolveComplaintModal func={close} id={id} />)}
            <div className=" mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                    <div className='flex justify-between'>
                        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                            <BiArrowBack className="mr-2" />
                            Back
                        </button>
                        <div className=" mb-4">


                            {formik?.values?.complaintStatus ===  "RESOLVED" ? (<div className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2">Resolved</div>):(
                                <select
                                className="p-3 rounded-[5px]   border-2 border-gray-200"
                                value={complaintStatus}
                                onChange={(e) => {
                                    
                                    handleStatusChange(e.target.value)
                                }}
                            >
                                <option value="">Change Compliant status</option>
                                <option value="RESOLVED">RESOLVED</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="OPEN">OPEN</option>
                            </select>
                            )}
                           
                            
                          
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">View Complaint by {`${data.complaintByUserName}`}</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-3 gap-4'>


                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Type
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {removeUnderscores(formik?.values?.complaintType) || '-----'}
                                </h4>
                            </div>
                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Date
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {formik?.values?.complaintDate || '-----'}
                                </h4>
                            </div>
                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Status
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {formik?.values?.complaintStatus || '-----'}
                                </h4>
                            </div>
                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Description
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {formik?.values?.compliantDescription || '-----'}
                                </h4>
                            </div>

                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Response
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {formik?.values?.compliantResponse || '-----'}
                                </h4>
                            </div>

                            <div className="mb-4 ">
                                <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                                    Complain Response Date
                                </h4>
                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                    {formik?.values?.complaintResponseDate || '-----'}
                                </h4>
                            </div>
                        </div>
                        <button onClick={() => setOpenModal(true)} className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Resolve Compliant'}</button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default ComplainId