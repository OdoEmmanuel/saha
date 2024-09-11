import React from 'react'

const ViewLoanRequirementLoanDetails = ({ data }) => {
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>Loan Details</h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className="mb-4 ">
                    <h4 className="uppercase mb-6 dark:text-gray-400   text-gray-900">
                        Loan Product Code
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.loanProductCode}
                    </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-400   text-gray-900 ">
                          maxLoanTenure
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.maxLoanTenure}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6   dark:text-gray-700   text-gray-900 ">
                          Min Amount For Special Approval
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.minAmountForSpecialApproval}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900 ">
                          Moratium
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.moratium}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900 ">
                          Interest Payment Frequency
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.interestPaymentFrequency}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                          principal Payment Frequency
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.principalPaymentFrequency}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                          computationMode
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.computationMode}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900 ">
                          Interest Rate
                        </h4>
                        <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                          {data.interestRate}
                        </h4>
                 </div>
            </div>
        </div>
    )
}

export default ViewLoanRequirementLoanDetails