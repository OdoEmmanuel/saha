import React from 'react'

const ViewLoanRequirementFilled = ({data}) => {
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>Requirement Filled</h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className="mb-4">
                    <h4 className=" mb-2 text-gray-500 ">
                        Terms And Condition Accepted required
                    </h4>
                    <h4 className=" mb-6  text-gray-500 font-bold text-lg">
                        {data?.termsAndConditionAcceptedRequired === true
                            ? 'yes'
                            : 'No'}
                    </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500 ">
                    Has Existing Loan With Other Institution Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.hasExistingLoanWithOtherInstitutionRequired === true
                      ? 'yes'
                      : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500 ">
                    Home Owner Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.homeOwnerRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    No Of Dependent Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.noOfDependentRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    Monthly Income Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.monthlyIncomeRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    Business Name Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.businessNameRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    Business Email Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.businessEmailRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    Business Address Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.businessAddressRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                    Business Role Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.businessRoleRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Bank Statement Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.bankStatementRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  CAC Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.cacRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Govt Issued Id Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.govtIssuedIdRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Utility Bill Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.utilityBillRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Remita Application Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.remitaApplicationRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Salary Statement Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.salaryStatementRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Guarantor Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.guarantorRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Guarantor IdCard Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.guarantorIdCardRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Guarantor Passport Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.guarantorPassportRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Work IdCard Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.workIdCardRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
                <div className="mb-4">
                  <h4 className=" mb-2 text-gray-500  ">
                  Confirmation Letter Required
                  </h4>
                  <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                    {data?.confirmationLetterRequired === true ? 'yes' : 'No'}
                  </h4>
                </div>
            </div>
        </div>
    )
}

export default ViewLoanRequirementFilled