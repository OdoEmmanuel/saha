import React from 'react'

const ViewPendingLoanDetails = ({ dat }) => {
    const data = dat

    console.log(data)
   

   

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
            {/* <h1 className='mb-8 font-[500] text-[25px]'></h1> */}
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Customer Email
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.customerEmail || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Customer Phone
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.customerPhone || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Company Code
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.companyCode || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Approval Item Type
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.approvalItemType || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Approval Stage
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.currentApprovalStage || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Approval Status
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.approvalStatus || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Approval Activities Comment
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.approvalActivityLogComment || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Approval Activity Log
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.approvalActivityLog || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Book Status
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.bookStatus || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Book By
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {data?.bookBy || '----'}
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

            

                
                <div className="mb-4 w-full">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Reference
                    </h4>
                    <h4 className=" mb-6 text-gray-800 text-[18px] font-semibold   dark:text-gray-800">
                        {data?.reference || '----'}
                    </h4>
                </div>
              
              
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Created Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {formatDate(data?.createdAt) || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        Updated Date
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                        {formatDate(data?.updatedAt) || '----'}
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

export default ViewPendingLoanDetails