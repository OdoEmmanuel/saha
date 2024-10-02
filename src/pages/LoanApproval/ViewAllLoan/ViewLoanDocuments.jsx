import {useState} from 'react'
import { LucideEye, LucideFileText, LucideUsers } from 'lucide-react'

const ViewLoanDocuments = ({ data }) => {

    const [showPdf, setShowPdf] = useState(false)

    const togglePdfViewer = () => {
        setShowPdf(!showPdf)
      }

    return (
      <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8'>
      <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll'>
        <thead className='bg-gray-50 text-[rgba(7,45,86,1)] font-[600] '>
          <tr>
            <th className='px-4 py-4 text-start text-sm  whitespace-nowrap'>Document</th>
            <th className='px-4 py-4 text-start text-sm  whitespace-nowrap'>View</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {!data?.utilityBill ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Utility Bill</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.utilityBill}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}
          {!data?.salaryStatement ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Salary Statement</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.salaryStatement}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.guarantor ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Guarantor</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.guarantor}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.guarantorIdCard ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Guarantor Id Card</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.guarantorIdCard}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.govtIssuedId ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Government Issue Id</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.govtIssuedId}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}


          {!data?.cac ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">CAC</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.cac}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.guarantorPassport ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Guarantor Passport</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.guarantorPassport}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.workIdCard ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Work Id Card</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.workIdCard}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.confirmationLetter ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Confirmation Letter</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.confirmationLetter}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.remitaApplicationEvidence ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Remita Application Evidence</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.remitaApplicationEvidence}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}

          {!data?.bankStatement ? ('') : (
            <tr>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap text-[#667085]">Bank Statement</td>
              <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap hover:text-blue-500/[0.7] text-[rgb(79,70,229)]">
                <a onClick={togglePdfViewer}
                  href={data?.bankStatement}
                  target="blank">
                  <LucideEye />
                </a>
              </td>
            </tr>
          )}



        </tbody>
      </table>
    </div>
    )
}

export default ViewLoanDocuments