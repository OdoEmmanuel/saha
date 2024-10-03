import React, { useState } from 'react'
import { LucideEye, X } from 'lucide-react'

// Custom Modal component using Tailwind classes
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-auto relative" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ViewPendingDocument = ({ kycs }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden p-8'>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Document Name
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {kycs.map((kyc, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {removeUnderscores(kyc.documentType)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <LucideEye 
                                    className='cursor-pointer text-indigo-600 hover:text-indigo-900'
                                    onClick={() => openModal(kyc.s3ObjectUrl)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <img 
                    src={selectedImage} 
                    alt="Document" 
                    className="max-w-full max-h-[70vh] object-contain"
                />
            </Modal>
        </div>
    )
}

export default ViewPendingDocument