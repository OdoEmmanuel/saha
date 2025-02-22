import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ViewHeader = ({ id }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("customers");

  const links = [
    { name: 'Customer Details', value: 'customers', path: `/ui/customer/Veiw-all-customer/${id}/` },
    { name: 'Next of Kin Details', value: 'kin', path: `/ui/customer/Veiw-all-customer/${id}/kin` },
    { name: 'Documents', value: 'documents', path: `/ui/customer/Veiw-all-customer/${id}/documents` },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/ui/customer/customer-date')}
          className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Customer View</h1>
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

export default ViewHeader;