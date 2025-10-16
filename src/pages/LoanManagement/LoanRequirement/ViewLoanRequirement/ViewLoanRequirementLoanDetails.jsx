import React from 'react'

const ViewLoanRequirementLoanDetails = ({ data }) => {
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>Loan Details</h1>
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Loan Product Code
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.loanProductCode || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500 ">
                          maxLoanTenure
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.maxLoanTenure || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2   text-gray-500    ">
                          Min Amount For Special Approval
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.minAmountForSpecialApproval || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2   text-gray-500    ">
                          Min Amount
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.minAmount || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2   text-gray-500    ">
                          Max Amount
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.maxAmount || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 text-gray-500  ">
                          Moratium
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.moratium || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 text-gray-500  ">
                          Interest Payment Frequency
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.interestPaymentFrequency || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 text-gray-500 ">
                          principal Payment Frequency
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.principalPaymentFrequency || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 text-gray-500 ">
                          computationMode
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.computationMode || '----'}
                        </h4>
                </div>
                <div className="mb-4">
                        <h4 className=" mb-2 text-gray-500  ">
                          Interest Rate
                        </h4>
                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                          {data?.interestRate || '----'}
                        </h4>
                 </div>
            </div>
        </div>
    )
}

export default ViewLoanRequirementLoanDetails