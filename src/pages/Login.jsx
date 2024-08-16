import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signinValidate } from "../services";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import icon from "../assets/gti-microfinance-logo.png";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuthContext } from "../common/context/useAuthContext";
import { toast, Bounce } from "react-toastify";
import JSEncrypt from 'jsencrypt'
import { PulseLoader } from "react-spinners";

const Login = () => {
  const{authorizationService,request,clientid} = useAuthContext()
  const [isLoading, setisLoading] = useState(false);
  
  const [toggle, settoggle] = useState(false);
  const [countrycheck, setcountrycheck] = useState("Nigeria");
  const [toggle2, settoggle2] = useState(false);
  const navigate = useNavigate();
  const Public_key = import.meta.env.VITE_public_key



 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidate,  
    onSubmit: (values) => {
      setisLoading(true);
         var encrypt = new JSEncrypt()
      encrypt.setPublicKey(Public_key)

      var ciphertext = encrypt.encrypt(values.password)

      const body = { username:values.email, password: ciphertext }
    
      const config = {
        headers: {
          'client-id': clientid,
          'Content-Type': 'application/json',
          'request-source': request,
          'Username': values.email
        },
      };
      axios
        .post(`${authorizationService}oauth/login`, body, config)
        .then((res) => {
          toast.success(res.data.responseMessage);
          console.log(res.data.data)
          localStorage.setItem('token', res.data.data.accessToken)
          localStorage.setItem('email', res.data.data.email)
          localStorage.setItem('name', res.data.data.username)
          localStorage.setItem('companyCode', res.data.data.companyCode)
          localStorage.setItem('userType', res.data.data.userType)

          
        if (res.data.data.hasChangedPassword === false) {
          navigate('/ui/system/changepassword')
        }
        

        navigate('/')
          // secureLocalStorage.setItem("values", values);
        })
        .catch((e) => {
          // console.log(e.response.data.responseMessage);
          toast.error(e.response.data.responseMessage || 'an error occured');
        })
        .finally(() => {
          setisLoading(false);
        });
    },
  });
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
        <h1 className="font-[500] text-[25px] mb-8 text-center">Login to your account</h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputField
              label={`Email address`}
              name={`email`}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              errorText={formik.errors.email}
              placeHolder={`Enter Your E-mail Address`}
            />
          </div>

          <div>
            <div className="relative">
              <InputField
                label={`Password`}
                name={`password`}
                type={toggle ? "text" : "Password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                errorText={formik.errors.password}
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
              <div className="flex justify-between">
                <div></div>
                <div>
                  <Link to="/auth/recover-password" className="text-[rgb(79,70,229)]">Forgot Password?</Link>
                </div>
              </div>

            </div>
          </div>
          <div>
            
              {" "}
              <button
                type="submit"
                className="hover:bg-[rgb(129,140,248)] bg-[rgb(79,70,229)] py-2 shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full p-1 mt-4 text-white rounded-[5px]"
              >
                Login
              </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
