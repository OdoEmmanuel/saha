import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signinValidate } from "../services";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import icon from "../assets/gti-microfinance-logo.png";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [countrycheck, setcountrycheck] = useState("Nigeria");
  const [toggle2, settoggle2] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidate,
    onSubmit: (values) => {
      setisLoading(true);
      axios
        .post(`/accounts/login/`, values)
        .then((res) => {
          console.log(res);
          // toast.success(res.data.message, {
          //   transition: Bounce,
          // });
          secureLocalStorage.setItem("values", values);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message, {
            transition: Bounce,
          });
        })
        .finally(() => {
          setisLoading(false);
        });
    },
  });
  return (
    <div className="bg-[rgb(17,24,39)] flex flex-col items-center py-10 px-10 h-screen ">
      <img alt="Your Company" src={icon} className="mx-auto h-10 w-auto mb-6" />
      <div className="bg-[#fff] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]  px-16 py-5 lg:w-[35%] w-[80%]">
        <h1 className="font-[500] text-[25px] mb-8 text-center">Login to your account</h1>

        <form className="">
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
                  <p className="text-[rgb(79,70,229)]">Forgot Password?</p>
                </div>
              </div>
              {/* <div>
              <p className="text-sm text-contentFade">Password must have</p>

              <div className="flex flex-wrap mt-4 gap-3 text-[13px]">
                <p
                  className={`${
                    /^(?=.*[a-z])/.test(formik.values.password)
                      ? "text-[#FFFFFF] bg-[#008A2F]"
                      : "text-fadedBlue bg-[#FFFFFF]"
                  } py-1 px-2 rounded-[20px]`}
                >
                  1 Lowercase
                </p>
                <p
                  className={`${
                    /^(?=.*[A-Z])/.test(formik.values.password)
                      ? "text-[#FFFFFF] bg-[#008A2F]"
                      : "text-fadedBlue bg-[#FFFFFF]"
                  } py-1 px-2 rounded-[20px]`}
                >
                  1 Uppercase
                </p>
                <p
                  className={`${
                    /^.{8,}$/.test(formik.values.password)
                      ? "text-[#FFFFFF] bg-[#008A2F]"
                      : "text-fadedBlue bg-[#FFFFFF]"
                  } py-1 px-2 rounded-[20px]`}
                >
                  At least 8 Characters
                </p>
                <p
                  className={`${
                    /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/.test(
                      formik.values.password
                    )
                      ? "text-[#FFFFFF] bg-[#008A2F]"
                      : "text-fadedBlue bg-[#FFFFFF]"
                  } py-1 px-2 rounded-[20px]`}
                >
                  1 Special Character
                </p>
                <p
                  className={`${
                    /^(?=.*\d)/.test(formik.values.password)
                      ? "text-[#FFFFFF] bg-[#008A2F]"
                      : "text-fadedBlue bg-[#FFFFFF]"
                  } py-1 px-2 rounded-[20px]`}
                >
                  1 Number
                </p>
              </div>
            </div> */}
            </div>
          </div>
          <div>
              <Link to={"/home"}>
                {" "}
                <button
                  type="submit"
                  className="hover:bg-[rgb(129,140,248)] bg-[rgb(79,70,229)] py-2 shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full p-1 mt-4 text-white rounded-[5px]"
                >
                  Login
                </button>
              </Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
