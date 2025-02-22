import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuthContext } from '../../../../common/context/useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const PropertyHeader = ({id}) => {
     const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("customers");
    const [openModal, setOpenModal] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState('');
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    setHeaders('Property Details')
  
    const links = [
      { name: 'Property Details', value: 'customers', path: `/ui/tables/property/${id}/` },
      { name: 'Documents', value: 'documents', path: `/ui/tables/property/${id}/document` },
    ];

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            
            'request-source': request,
            'Username': email
        },
    };
  
    const statusOptions = [
      { value: '', label: 'Select Status' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' },
      { value: 'Inspected', label: 'In Review' },
      { value: 'Pending', label: 'Pending' },
    ];
  
    const handleStatusChange = (e) => {
        setApprovalStatus(e.target.value);
        const formData = new FormData();
        formData.append("propertyStatus", e.target.value);
    
        // Create the correct headers configuration
        const configWithFormData = {
            ...config,
            headers: {
                ...config.headers,
                'Content-Type': 'multipart/form-data'
            }
        };
    
        axios.put(`${middleware}property/${id}`, formData, configWithFormData)
            .then((res) => {
                toast.success(`${res.data.responseMessage}`);
            })
            .catch((e) => {
                if (e.response?.data?.responseMessage === 'Invalid/Expired Token' || 
                    e.response?.data?.responseMessage === 'Invalid Token' || 
                    e.response?.data?.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage);
                    navigate('/auth/login');
                    localStorage.clear();
                }
                else if (e.response?.data?.responseMessage === 'Insufficient permission') {
                    toast.error(e.response.data.responseMessage);
                    navigate('/');
                }
                else {
                    toast.error(e.response?.data?.responseMessage || 'An error occurred');
                }
            });
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="sm:flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/ui/LoanApproval/pendingloans')}
              className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Properties Details</h1>
          </div>
          <div className="relative">
            <select
              className=" border-2  text-black px-4 py-2 pr-8 rounded-md cursor-pointer  transition-colors duration-200 sm:mt-0 mt-4 w-full"
              value={approvalStatus}
              onChange={handleStatusChange}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>
        </div>
        <nav className="flex space-x-1">
          {links.map((link) => (
            <Link
              key={link.value}
              to={link.path}
              onClick={() => setActiveLink(link.value)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeLink === link.value
                  ? 'bg-[#002853] text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    );
}

export default PropertyHeader