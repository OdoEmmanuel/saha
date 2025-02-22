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

  export const  emailValidate = yup.object().shape({
    email:yup.string().email("enter valid email").required("required")
  })


  export const recoverPassword = yup.object().shape({
    otp:yup.string().max(6,"can't contain more than 6 characters").required("required"),
    username:yup.string().email("enter valid Username").required("required"),
    newPassword: yup
    .string()
    .min(8, "password must containat least 8 characters ")
    .matches(
      passwordRegExp,
      "characters with at least one of each: , lowercase, number and special"
    )
    .required("required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("required"),
  })

  export const CreateStaffs= yup.object().shape({
    email: yup
    .string()
    .email('Please enter valid email')
    .required('Please enter email'),
  Name:yup.string().required(`Please enter staff last name `),
  phone: yup.string().required('Please enter mobile number'),
  lang: yup.string().required('Enter language'),
  userType: yup.string().required('Select Staff type'),
  })

  export const loanPurpose = yup.object().shape({
    description:yup.string().required('enter description'),
    purpose: yup.string().required('enter your purpose')

  })

  export const loanTenure =yup.object().shape({
    tenure:yup.number().required('enter Tenure'),
    description: yup.string().required('enter your description')

  })

  export const homeOwnership = yup.object().shape({
    ownershipType:yup.string().required('enter your OwnerShipType'),
    description: yup.string().required('enter your description')

  })

  export const group = yup.object().shape({
    groupName: yup.string().required(`Please enter the group's full name`),
    description: yup.string().required('Please enter description'),
  })



  export const ComplianType = yup.object().shape({
    complaintType: yup.string(),
    complaintDate: yup.string(),
    complaintStatus: yup.string(),
    compliantDescription:yup.string(),
    compliantResponse:yup.string(),
    complaintResponseDate:yup.string()
  })

  export const fixedDeposit = yup.object().shape({
    fixedDepositType: yup.string().required(`Please enter the fixed deposit type`),
    description: yup.string().required('Enter The Description'),
    tenure:yup.number().required('Enter the duration'),
    minAmount: yup.number().required(`Enter Minimmum Amount`),
    maxAmount: yup.number().required(`Enter the maximum Amount`),
    rate:yup.number().required('Enter the rate'),
    tax: yup.number().required(`Enter Tax `),
    taxDeductible: yup.boolean().required().oneOf([true , false]),
    available: yup.boolean().required().oneOf([true , false]),

  })


  export const changePassword = yup.object().shape({
    currentPassword:yup.string()
    .min(8, "password must containat least 8 characters ")
    .required("required"),
    newPassword: yup.string()
    .min(8, "password must containat least 8 characters ")
    .required("required"),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("required"),
  })

  export const LoanType = yup.object().shape({
    productCode:yup.string().required('Product Code Required'),
    productName:yup.string().required('Product Name Required'),
    category:yup.string().required('category Required'),
    status:yup.string().required('status')
  })
  