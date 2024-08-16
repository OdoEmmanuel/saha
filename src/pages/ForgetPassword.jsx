import React,{useState} from 'react'
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useFormik } from "formik";
import { recoverPassword } from '../services';
import icon from "../assets/gti-microfinance-logo.png";
import InputField from "../components/InputField";
import { useAuthContext } from '../common/context/useAuthContext';

const ForgetPassword = () => {
    const{authorizationService,request,clientid} = useAuthContext()
  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="bg-[rgb(17,24,39)] flex flex-col items-center py-10 px-10 min-h-screen ">
         {isLoading && (
        <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
          {" "}
          <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
        </div>
      )}
       <img alt="Your Company" src={icon} className="mx-auto h-10 w-auto mb-6" />
       <div className="bg-[#fff] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]  px-16 py-5 lg:w-[35%] w-[80%]">
       <h1 className="font-[500] text-[25px] mb-8 text-center">Reset Your Password</h1>
       </div>
    </div>
  )
}

export default ForgetPassword