import React from 'react'
import { LucideEye, LucideFileText, LucideUsers } from 'lucide-react'

const ViewPendingDocument = ({ kycs }) => {
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

                <thead className="bg-gray-50 text-[#667085] font-[500] ">
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
                                <LucideEye onClick={() => openImage(kyc.s3ObjectUrl)} className='cursor-pointer' />
                            </td>
                        </tr>
                    ))}

                </tbody>



            </table>
        </div>
  )
}

export default ViewPendingDocument