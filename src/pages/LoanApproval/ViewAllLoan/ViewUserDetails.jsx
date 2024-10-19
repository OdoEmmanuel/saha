import React from 'react'

const ViewUserDetails = ({dat}) => {
    const data = dat
    
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>CUSTOMERS DETAILS</h1>
            <div className='grid sm:grid-cols-3 grid-col-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Customer Details
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.customerId || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Disbursement Account
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.disbursementAccount || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Loan Account
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.loanAccount || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Has Existing Loan With Other Institution
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.hasExistingLoanWithOtherInstitution || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Home Owner
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.homeOwner || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    NO Of Dependent
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.noOfDependent || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Monthly Income
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.monthlyIncome || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Business Email
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400 ">
                    {data?.businessEmail || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Business Address
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                    {data?.businessAddress || '----'}
                    </h4>
                </div>
                <div className="mb-4 w-full">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                    Business Role
                    </h4>
                    <h4 className=" mb-6 text-gray-500   dark:text-gray-400">
                        {data?.businessRole || '----'}
                    </h4>
                </div>
               

               
            </div>
        </div>
    )
}

export default ViewUserDetails