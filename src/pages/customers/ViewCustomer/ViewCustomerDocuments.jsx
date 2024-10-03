import React from 'react'
import { LucideEye, LucideFileText, LucideUsers,X } from 'lucide-react'


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

const ViewCustomerDocuments = ({ kycs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }

    const Kyc = kycs
    console.log(Kyc)

    function openImage(src) {
        // Open the image in a new tab/window
        window.open(src, '_blank')
      }

    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8'>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                <thead className="bg-gray-50 text-[rgba(7,45,86,1)] font-[600] ">
                    <tr className=" ">
                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                            Document Name
                        </th>
                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                            View
                        </th>

                    </tr>
                </thead>


                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">

                    {Kyc.map((kyc, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">
                                {removeUnderscores(kyc.documentType)}
                            </td>
                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                                <LucideEye onClick={() => openModal(kyc.s3ObjectUrl)} className='cursor-pointer' />
                            </td>
                        </tr>
                    ))}

                </tbody>



            </table>
        </div>
    )
}

export default ViewCustomerDocuments