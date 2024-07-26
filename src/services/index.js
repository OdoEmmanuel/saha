import * as yup from "yup";
import axios from "axios";

const phoneRegExp = /^\d{3} \d{3} \d{4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#;:])[A-Za-z\d@$!%*?&#;:]{8,}$/;


  export const signinValidate = yup.object().shape({
    email: yup.string().email("enter valid email").required("required"),
    password: yup
      .string()
      .min(8, "password must containat least 8 characters ")
      .required("required"),
  });