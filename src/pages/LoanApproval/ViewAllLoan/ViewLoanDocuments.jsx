import React, { useState } from 'react'
import { LucideEye, X } from 'lucide-react'

// Custom Modal component using Tailwind classes
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const ViewLoanDocuments = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const openModal = (documentUrl) => {
        setSelectedDocument(documentUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const documents = [
        { name: 'Utility Bill', url: data?.utilityBill },
        { name: 'Salary Statement', url: data?.salaryStatement },
        { name: 'Guarantor', url: data?.guarantor },
        { name: 'Guarantor Id Card', url: data?.guarantorIdCard },
        { name: 'Government Issue Id', url: data?.govtIssuedId },
        { name: 'CAC', url: data?.cac },
        { name: 'Guarantor Passport', url: data?.guarantorPassport },
        { name: 'Work Id Card', url: data?.workIdCard },
        { name: 'Confirmation Letter', url: data?.confirmationLetter },
        { name: 'Remita Application Evidence', url: data?.remitaApplicationEvidence },
        { name: 'Bank Statement', url: data?.bankStatement },
    ];

    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden p-8'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'>Document</th>
                        <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'>View</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {documents.map((doc, index) => 
                        doc.url && (
                            <tr key={index}>
                                <td className="px-4 py-4  font-medium text-[#667085]">{doc.name}</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => openModal(doc.url)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <LucideEye size={20} />
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <Modal isOpen={showModal} onClose={closeModal}>
                <img
                    src={selectedDocument} 
                    title="Document Viewer"
                    className="w-full h-full border-none"
                />
            </Modal>
        </div>
    )
}

export default ViewLoanDocuments