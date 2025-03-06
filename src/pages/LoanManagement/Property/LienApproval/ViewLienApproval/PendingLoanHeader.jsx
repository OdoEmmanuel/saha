import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Modal from './Modal';

const PendingLoanHeader = ({ id,status }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("customers");
  const [openModal, setOpenModal] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('');

  const links = [
    { name: 'Loan Details', value: 'customers', path: `/ui/tables/viewapprovelien/${id}/` },
    { name: 'User Details', value: 'kin', path: `/ui/tables/viewapprovelien/${id}/user` },
    { name: 'Documents', value: 'documents', path: `/ui/tables/viewapprovelien/${id}/documents` },
    ...(status === 'ACTIVE' ? [{ name: 'Collaterals', value: 'collaterals', path: `/ui/tables/viewapprovelien/${id}/collaterals` }] : [])
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Approve', label: 'Approve' },
    { value: 'Reject', label: 'Reject' },
    { value: 'Recall', label: 'Recall' },
    { value: 'Rework', label: 'Rework' },
  ];

  const handleStatusChange = (e) => {
    setApprovalStatus(e.target.value);
    setOpenModal(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      {openModal && <Modal id={id} func={() => setOpenModal(false)} status={approvalStatus} />}
      <div className="sm:flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/ui/LoanApproval/pendingloans')}
            className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Pending Loan Details</h1>
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
};

export default PendingLoanHeader;