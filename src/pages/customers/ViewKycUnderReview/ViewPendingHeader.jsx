import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, MessageSquare } from 'lucide-react';
import KycReviewModal from './KycReviewModal';

const ViewPendingHeader = ({ id, func }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("customers");
  const [openKycModal, setOpenKycModal] = useState(false);

  const links = [
    { name: 'Customer Details', value: 'customers', path: `/ui/customer/kyc-under-review/view/${id}/` },
    { name: 'Next of Kin Details', value: 'kin', path: `/ui/customer/kyc-under-review/view/${id}/kin` },
    { name: 'Documents', value: 'documents', path: `/ui/customer/kyc-under-review/view/${id}/documents` },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      {openKycModal && <KycReviewModal isOpen={openKycModal} onClose={() => setOpenKycModal(false)} customerId={id} />}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/ui/customer/pending-kyc')}
            className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">KYC Under Review Details</h1>
        </div>
        <div className='flex items-center space-x-3'>
        <button
            onClick={() => setOpenKycModal(true)}
            className="flex items-center px-4 py-2 bg-[#002853] text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            KYC Review
          </button>
        <button
          className="flex items-center px-4 py-2 bg-[#002853] text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={func}
        >
          <Check className="w-5 h-5 mr-2" />
          Approve KYC
        </button>
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
};

export default ViewPendingHeader;