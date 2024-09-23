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
    const [userType, setUserType] = useState([])
    const [data,setData] = useState({})
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const navigate = useNavigate()
    const [openModel,setOpenModal] = useState(false)


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
        <div className=" bg-gray-100 ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            {openModel && (<ResolveComplaintModal close={close} id={id}/>)}
            <div className=" mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">View Complaint by {`${data.complaintByUserName}`}</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-2 gap-4'>

                            <InputField2
                                label={`Complain Type`}
                                name={`compliantType`}
                                disabled={true}
                                value={formik.values.complaintType}
                                onChange={formik.handleChange}
                                error={formik.touched.complaintType && formik.errors.complaintType}
                                errorText={formik.errors.complaintType}

                            />

                            <InputField2
                                label={`Complain Date`}
                                name={`complaintDate`}
                                disabled={true}
                                value={formik.values.complaintDate}
                                onChange={formik.handleChange}
                                error={formik.touched.complaintDate && formik.errors.complaintDate}
                                errorText={formik.errors.complaintDate}

                            />


                            <InputField2
                                label={`Complain Status`}
                                name={`complaintStatus`}
                                disabled={true}
                                value={formik.values.complaintStatus}
                                onChange={formik.handleChange}
                                error={formik.touched.complaintStatus && formik.errors.complaintStatus}
                                errorText={formik.errors.complaintStatus}
                            />

                            <InputField2
                                label={`Complain Description`}
                                name={`complaintDescription`}
                                disabled={true}
                                value={formik.values.compliantDescription}
                                onChange={formik.handleChange}
                                error={formik.touched.compliantDescription && formik.errors.compliantDescription}
                                errorText={formik.errors.compliantDescription}
                            />
                            <InputField2
                                label={`Complain Response`}
                                name={`complaintResponse`}
                                disabled={true}
                                value={formik.values.compliantResponse}
                                onChange={formik.handleChange}
                                error={formik.touched.compliantResponse && formik.errors.compliantResponse}
                                errorText={formik.errors.compliantResponse}
                            />

                            <InputField2
                                label={`Complain Response Date`}
                                name={`complaintResponseDate`}
                                disabled={true}
                                value={formik.values.complaintResponseDate}
                                onChange={formik.handleChange}
                                error={formik.touched.complaintResponseDate && formik.errors.complaintResponseDate}
                                errorText={formik.errors.complaintResponseDate}
                            />



                        </div>
                        <button onClick={()=> setOpenModal(true)} className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Resolve Compliant'}</button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default ComplainId