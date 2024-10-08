import React from 'react'

const ViewPendingCustomer = ({dat}) => {
    const data = dat
    console.log(data)
  return (
    <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>Customers Details</h1>
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        First Name
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.firstName || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Last Name
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.lastName || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Middle Name
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.middleName || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Gender
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.gender || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Nationality
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.nationality || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Marital Status
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.maritalStatus || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Date Of Birth
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.dateOfBirth || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Mothers Maiden Name
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400 ">
                        {data?.mothersMaidenName || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Contact Address
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.contactAddress || '----'}
                    </h4>
                </div>
                <div className="mb-4 w-full">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Contact Email
                    </h4>
                    <h4 className=" mb-6 text-gray-500   dark:text-gray-400">
                        {data?.contactEmail || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Contact Phone
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.contactPhone || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Preferred Mode Of Contact
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.preferredModeOfContact || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Occupation
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.occupation || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Employment Nature
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.employmentNature || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Business Name
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.businessName || '----'}
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
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Business Phone
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.businessAddress || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Created Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.createdDate || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Updated Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.updatedDate || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        CreatedBy
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.createdBy || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400]    text-gray-500">
                        Update By
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                        {data?.updatedBy || '----'}
                    </h4>
                </div>
            </div>
        </div>
  )
}

export default ViewPendingCustomer