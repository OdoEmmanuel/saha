import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';

import { FaPen } from 'react-icons/fa';
import Checkbox from "../../assets/checkbox.png"

const LoanRequirement = () => {

    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setisLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')


    setHeaders('Loan Requirement')
  return (
    <div>LoanRequirement</div>
  )
}

export default LoanRequirement