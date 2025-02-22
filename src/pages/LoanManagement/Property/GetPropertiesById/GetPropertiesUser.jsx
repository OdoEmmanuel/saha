import React from 'react'

const GetPropertiesUser = ({dat}) => {
    const data = dat
   
    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            <h1 className='mb-8 font-[500] text-[25px]'>CUSTOMERS DETAILS</h1>
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                        User Id
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.userId || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Createress
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.Createress || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Title Number
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.titleNo || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                  Value
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.value || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Status
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.status || '----'}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Status Meaning
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.
statusMeaning
 || '----'}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-2 dark:text-gray-400 font-[400] text-[20px]    text-gray-500">
                    Comment
                    </h4>
                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-800 dark:text-gray-400">
                    {data?.comments || '----'}
                    </h4>
                </div>

                
               

               
            </div>
        </div>
    )
}

export default GetPropertiesUser