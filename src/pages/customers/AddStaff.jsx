import React,{useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom'
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';

const AddStaff = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [languages, setLanguages] = useState([])
  const [userType, setUserType] = useState([])
  const [isLoading, setisLoading] = useState(false);

  setHeaders('Add Staff')

  useEffect(() =>{
    axios 
  },[])
  return (
    <div>AddStaff</div>
  )
}

export default AddStaff