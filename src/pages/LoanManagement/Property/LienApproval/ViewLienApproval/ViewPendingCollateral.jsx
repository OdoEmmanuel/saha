import React from 'react'

const ViewPendingCollateral = ({data}) => {
  
    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden p-8'>
              <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'> Collateral id</th>
                            <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'>Description</th>
                            <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'>Units</th>
                            <th className='px-4 py-4 text-left  font-semibold text-[rgba(7,45,86,1)]'>Title No</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            data.map((collateral,index) => (
                                <tr key={index}>
                                   <td className=' px-4 py-4  font-medium text-[#667085]'>{collateral.id}</td> 
                                   <td className=' px-4 py-4  font-medium text-[#667085]'>{collateral.name}</td> 
                                   <td className=' px-4 py-4  font-medium text-[#667085]'>{collateral.units}</td> 
                                   <td className=' px-4 py-4  font-medium text-[#667085]'>{collateral.additionalInfo}</td> 
                                 
                                </tr>
                            ))
                        }
                    </tbody>
              </table>
        </div>
      )
  
}

export default ViewPendingCollateral