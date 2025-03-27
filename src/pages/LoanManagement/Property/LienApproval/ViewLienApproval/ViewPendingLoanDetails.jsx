import React from 'react'

const ViewPendingLoanDetails = ({ dat }) => {
    // The data is already the object, no need for nested access
    const data = dat || {}

    const formatDate = (dateString) => {
        if (!dateString) return '----'
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
    
        return `${year}-${month}-${day}`
    }

    // Helper function to format activity log or comment
    const formatActivityObject = (obj) => {
        if (!obj || typeof obj !== 'object') return '----'
        
        // Convert object to a readable string
        return Object.entries(obj)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
    }

    // Helper function to render a detail row
    const renderDetailRow = (label, value) => (
        <div className="mb-4">
            <h4 className="mb-2 dark:text-gray-400 font-[400] text-[20px] text-gray-500">
                {label}
            </h4>
            <h4 className="font-semibold mb-6 text-[18px] text-gray-800 dark:text-gray-400">
                {value || '----'}
            </h4>
        </div>
    )

    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8'>
            <div className='grid sm:grid-cols-3 grid-cols-2 gap-4'>
                {renderDetailRow('Customer Email', data.customerEmail)}
                {renderDetailRow('Customer Phone', data.customerPhone)}
                {renderDetailRow('Company Code', data.companyCode)}
                {renderDetailRow('Approval Item Type', data.approvalItemType)}
                {renderDetailRow('Approval Stage', data.currentApprovalStage)}
                {renderDetailRow('Approval Status', data.approvalStatus)}
                {renderDetailRow('Approval Activities Comment', formatActivityObject(data.approvalActivityLogComment))}
                {renderDetailRow('Approval Activity Log', formatActivityObject(data.approvalActivityLog))}
                {renderDetailRow('Book Status', data.bookStatus)}
                {renderDetailRow('Book By', data.bookedBy)}
                {renderDetailRow('Comment', data.comment)}
                {renderDetailRow('Reference', data.reference)}
                {renderDetailRow('Created Date', formatDate(data.createdAt))}
                {renderDetailRow('Updated Date', formatDate(data.updatedAt))}
                {renderDetailRow('Updated By', data.updatedBy)}
                {renderDetailRow('Created By', data.createdBy)}
            </div>
        </div>
    )
}

export default ViewPendingLoanDetails