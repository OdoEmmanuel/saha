import React from 'react'

const ViewCustomerKin = ({ dat }) => {
    const data = dat
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8'>
            <h1 className='mb-8 font-[500] text-[25px]'>NEXT OF KINS DETAILS</h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-400   text-gray-900">
                        Next Of Kin Title
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinTitle}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin FirstName
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinFirstName}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900 ">
                        Next Of Kin Middle Name
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinMiddleName}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin Last Name
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400 ">
                        {data.nextOfKinLastName}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin Email
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinEmail}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin Relationship
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinRelationship}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin Address
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinAddress}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin PhoneNo
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinPhoneNo}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin PhoneNo
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinPhoneNo}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className="uppercase mb-6 dark:text-gray-700   text-gray-900">
                        Next Of Kin Relationship Other
                    </h4>
                    <h4 className="uppercase mb-6 text-gray-500 dark:text-gray-400">
                        {data.nextOfKinRelationshipOther}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default ViewCustomerKin