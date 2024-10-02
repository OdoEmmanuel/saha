
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { changePassword } from '../../services';
import { useNavigate, Link } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import InputField2 from '../../components/InputField2';
import SelectField from '../../components/SelectField';
import { BiArrowBack } from "react-icons/bi";
import JSEncrypt from 'jsencrypt'

const ChangePassword = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
    const [userType, setUserType] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const [toggle, settoggle] = useState(false);
    const [toggle2, settoggle2] = useState(false);
    const fetchCompanyCode = localStorage.getItem('companyCode')
    const navigate = useNavigate()

    setHeaders('Change Password')


    
  function encryptedPassword(text) {


    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(Public_key)

    var ciphertext = encrypt.encrypt(text)
    return ciphertext
  }

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
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',

        },
        validationSchema: changePassword,
        onSubmit: (values, { resetForm }) => {
              const body = {
                currentPassword:encryptedPassword(values.currentPassword),
                newPassword:encryptedPassword(values.newPassword),
                confirmPassword: encryptedPassword(values.confirmPassword)
              }

              axios.put(`${authorizationService}oauth/change-password`,body,config)
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
                    {/* <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button> */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col gap-4'>

                            <InputField2
                                label={`Current Password`}
                                name={`currentPassword`}
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.currentPassword && formik.errors.currentPassword}
                                errorText={formik.errors.currentPassword}

                            />

                            <div>
                                <div className="relative">
                                    <InputField2
                                        label={`New Password`}
                                        name={`newPassword`}
                                        type={toggle ? "text" : "Password"}
                                        value={formik.values.newPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.newPassword && formik.errors.newPassword}
                                        errorText={formik.errors.newPassword}
                                        placeHolder={"••••••••"}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="absolute text-[bg-#002853] inset-y-[2.8rem] right-3 text-lg ">
                                        {" "}
                                        {toggle ? (
                                            <RiEyeFill
                                                onClick={() => {
                                                    settoggle(!toggle);
                                                }}
                                            />
                                        ) : (
                                            <RiEyeOffFill
                                                onClick={() => {
                                                    settoggle(!toggle);
                                                }}
                                            />
                                        )}
                                    </div>   

                                </div>
                            </div>


                            <div>
                                <div className="relative">
                                    <InputField2
                                        label={`Confirm Password`}
                                        name={`confirmPassword`}
                                        type={toggle2 ? "text" : "Password"}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        errorText={formik.errors.confirmPassword}
                                        placeHolder={"••••••••"}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="absolute text-[bg-#002853] inset-y-[2.8rem] right-3 text-lg ">
                                        {" "}
                                        {toggle2 ? (
                                            <RiEyeFill
                                                onClick={() => {
                                                    settoggle2(!toggle2);
                                                }}
                                            />
                                        ) : (
                                            <RiEyeOffFill
                                                onClick={() => {
                                                    settoggle2(!toggle2);
                                                }}
                                            />
                                        )}
                                    </div>   

                                </div>
                            </div>


                       
                
                         


                        </div>


                        <button type='submit' className="text-white btn w-full bg-[#072D56] rounded-[10px] px-5 py-2"  > {isLoading ? 'loading....' : 'Change Password'}</button>

                    </form>
                </div>


            </div>
        </div>
    )
}

export default ChangePassword