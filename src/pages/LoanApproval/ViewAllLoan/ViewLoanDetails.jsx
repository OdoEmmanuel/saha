import React from 'react'

const ViewLoanDetails = ({ dat }) => {
    const data = dat
    

   

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const hr = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()

        const formattedDate = `${year}-${month}-${day}`
        return formattedDate
    }

    function removeUnderscores(text) {
       
        // return text.replace(/_/g, ' ')
    }

    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>CUSTOMERS DETAILS</h1>
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-2'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Loan Product Code
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.loanProductCode || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Loan Amount
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.loanAmount || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Tenure
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.tenure || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Moratorium
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.moratium || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Purpose
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.purpose || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Terms And Condition Accepted
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.termsAndConditionAccepted || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        NO Of Dependent
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.noOfDependent || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Interest Rate
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400 ">
                        {data?.interestRate || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Transaction Tracking Reference
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.transactionTrackingRef || '----'}
                    </h4>
                </div>
                <div className="mb-4 w-full">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Reference
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.reference || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Remark
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.remark || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Editable
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.editable || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Approval Status
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {removeUnderscores(data?.approvalStatus) || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Created Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {formatDate(data?.createdDate) || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Updated Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {formatDate(data?.updatedDate) || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Update By
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.updatedBy || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Created By
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.createdBy || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Comment
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.comment || '----'}
                    </h4>
                </div>

            </div>
        </div>
    )
}

export default ViewLoanDetails