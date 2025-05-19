import React, { useState } from 'react'
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useFormik } from "formik";
import { recoverPassword } from '../services';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import icon from '../assets/saha.png'
import InputField from "../components/InputField";
import JSEncrypt from 'jsencrypt'
import { useAuthContext } from '../common/context/useAuthContext';

const ForgetPassword = () => {
    const { authorizationService, request, clientid } = useAuthContext()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [toggle, settoggle] = useState(false);
    const Public_key = import.meta.env.VITE_public_key

    function encryptedPassword(text) {
        var encrypt = new JSEncrypt()
        encrypt.setPublicKey(Public_key)
        var ciphertext = encrypt.encrypt(text)
        return ciphertext
    }

    const formik = useFormik({
        initialValues: {
            otp: "",
            username: "",
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: recoverPassword,
        onSubmit: (values) => {
            setisLoading(true);
            const newPass = encryptedPassword(values.newPassword)
            const confirm = encryptedPassword(values.confirmPassword)
            const config = {
                headers: {
                    'client-id': clientid,
                    'Content-Type': 'application/json',
                    'request-source': request,
                    'Username': values.email
                },
            };
            axios
                .put(`${authorizationService}oauth/reset-password`, { ...values, newPassword: newPass, confirmPassword: confirm }, config)
                .then((res) => {
                   
                    toast.success(res.data.responseMessage)
                    navigate('/auth/login')
                })
                .catch((e) => {

                    toast.error(e.response.data.responseMessage)
                })
                .finally(() => {
                    setisLoading(false);
                })
        }
    })
    return (
        <div className="bg-[#002853] flex flex-col items-center py-10 px-10 min-h-screen ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <img alt="Your Company" src={icon} className="mx-auto h-10 w-auto mb-6" />
            <div className="bg-[#fff] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]  sm:px-16 px-4 py-5 lg:w-[35%] w-[80%]">
                <h1 className="font-[500] text-[25px] mb-8 text-center">Reset Your Password</h1>
                <form onSubmit={formik.handleSubmit}>

                    <InputField
                        label={`Email`}
                        name={`username`}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && formik.errors.username}
                        errorText={formik.errors.username}
                        placeHolder={`Enter Your E-mail Address`}
                    />

                    <InputField
                        label={`OTP`}
                        name={`otp`}
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        error={formik.touched.otp && formik.errors.otp}
                        errorText={formik.errors.otp}
                        placeHolder={`Enter Your E-mail Address`}
                    />

                    <div>
                        <div className="relative">
                            <InputField
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
                            <div className="absolute text-[rgb(79,70,229)] inset-y-[2.8rem] right-3 text-lg ">
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
                            <InputField
                                label={`Confirm Password`}
                                name={`confirmPassword`}
                                type={toggle ? "text" : "Password"}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                errorText={formik.errors.confirmPassword}
                                placeHolder={"••••••••"}
                                onBlur={formik.handleBlur}
                            />
                            <div className="absolute text-[rgb(79,70,229)] inset-y-[2.8rem] right-3 text-lg ">
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

                        {" "}
                        <button
                            type="submit"
                            className=" bg-[#002853] hover:bg-[rgb(17,24,39)]  py-2 shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full p-1 mt-4 text-white rounded-[5px]"
                        >
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword