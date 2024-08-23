import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ViewPendingHeader = ({id, func}) => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("customers");
    
  return (
    <div className='flex justify-between'>
            <div className='flex items-center mb-8'>
                <button onClick={() => navigate(-1)} className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        className="svg"
                    >
                        <path
                            d="M8.29289 16.2929C7.90237 16.6834 7.90237 17.3166 8.29289 17.7071L14.6569 24.0711C15.0474 24.4616 15.6805 24.4616 16.0711 24.0711C16.4616 23.6805 16.4616 23.0474 16.0711 22.6569L10.4142 17L16.0711 11.3431C16.4616 10.9526 16.4616 10.3195 16.0711 9.92893C15.6805 9.53841 15.0474 9.53841 14.6569 9.92893L8.29289 16.2929ZM25 16L9 16V18L25 18V16Z"
                            fill="#000"
                        />
                        <circle cx="16.5" cy="16.5" r="16" stroke="#000" />
                    </svg>
                </button>
                <Link to={`/ui/customer/pending-kyc/view/${id}/`} onClick={() => setActiveLink('customers')} className={`mr-4   pb-2 ${activeLink === 'customers' ? 'text-gray-600 font-[500]  border-b-2 border-gray-700':'text-gray-400'}`}> Customers Details </Link>
                <Link to={`/ui/customer/pending-kyc/view/${id}/kin`} onClick={() => setActiveLink('kin')} className={`mr-4  pb-2 ${activeLink === 'kin' ?  'text-gray-600 font-[500]  border-b-2 border-gray-700':'text-gray-500'}` }>Next of Kin details</Link>
                <Link to={`/ui/customer/pending-kyc/view/${id}/documents`} onClick={() => setActiveLink('documents')} className={`mr-4  pb-2 ${activeLink === 'documents' ? 'text-gray-600 font-[500]  border-b-2 border-gray-700':'text-gray-500'}`}>Documents</Link>
            </div>

            <button  className="text-white btn bg-blue-500 mb-8 hover:bg-primary rounded-[10px] px-5 py-2" onClick={func} > Approve Kyc</button>

        </div>
  )
}

export default ViewPendingHeader