import React,{useState} from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import icon from '../assets/saha.png'
import axios from "axios";
import { emailValidate } from '../services';
import { toast, Bounce } from "react-toastify";
import { PulseLoader } from "react-spinners";
import InputField from "../components/InputField";
import { useAuthContext } from '../common/context/useAuthContext';

const Otp = () => {

    const{authorizationService,request,clientid} = useAuthContext()
  const [isLoading, setisLoading] = useState(false);
     const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: emailValidate,
        onSubmit: (values) => {
            setisLoading(true);
            const config = {
                headers: {
                  'client-id': clientid,
                  'Content-Type': 'application/json',
                  'request-source': request,
                  'Username': values.email
                },
              };
          axios
          .put(`${authorizationService}oauth/reset-password/${values.email}/initiate`,values,config)
          .then((res) => {
          
            toast.success(res.data.responseMessage)
            navigate('/auth/reset-password')
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
        <div className="bg-[#002853]  flex flex-col items-center py-10 sm:px-10 px-5 min-h-screen ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <img alt="Your Company" src={icon} className=" h-[100px] w-[200px] mb-6" />
            <div className="bg-[#fff] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]  sm:px-16 px-4 py-5 lg:w-[35%]   w-[80%]">
                <h1 className="font-[500] sm:text-[25px] text-[15px] mb-8 text-center">Enter email to get OTP</h1>
                <form onSubmit={formik.handleSubmit}>
                    <InputField
                        label={`Email Address`}
                        name={`email`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        errorText={formik.errors.email}
                        placeHolder={`Enter Your E-mail Address`}
                    />
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

export default Otp