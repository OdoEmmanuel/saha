import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { X } from 'lucide-react';

const KycReviewModal = ({ isOpen, onClose, customerId }) => {
  console.log(customerId);
  const { middleware, request, clientid } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
    notifyCustomerBySms: false,
    notifyCustomerByEmail: false
  });

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'client-id': clientid,
      'Content-Type': 'application/json',
      'request-source': request,
      'Username': email
    },
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one notification method is selected
    if (!formData.notifyCustomerBySms && !formData.notifyCustomerByEmail) {
      toast.error('Please select at least one notification method');
      return;
    }

    // Validate comment is not empty
    if (!formData.comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setIsLoading(true);

    try {
      // Keep the original format with leading zeros
      const formattedId = customerId.toString();
      
      const requestBody = {
        customerId: parseInt(formattedId), // This preserves the original format with leading zeros
        notifyCustomerBySms: formData.notifyCustomerBySms,
        notifyCustomerByEmail: formData.notifyCustomerByEmail,
        comment: formData.comment.trim()
      };

      const response = await axios.put(
        `${middleware}kyc/review`,
        requestBody,
        config
      );

      toast.success('KYC review submitted successfully');
      onClose();
      // Reset form
      setFormData({
        comment: '',
        notifyCustomerBySms: false,
        notifyCustomerByEmail: false
      });
    } catch (error) {
      console.error('Error submitting KYC review:', error);
      
      if (error.response?.data?.responseMessage === 'Invalid/Expired Token' || 
          error.response?.data?.responseMessage === 'Invalid Token' || 
          error.response?.data?.responseMessage === 'Login Token Expired') {
        toast.error(error.response.data.responseMessage);
        // Handle token expiration - redirect to login
        localStorage.clear();
        window.location.href = '/auth/login';
      } else if (error.response?.data?.responseMessage === 'Insufficient permission') {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.response?.data?.responseMessage || 'An error occurred while submitting KYC review');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">KYC Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your review comment..."
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Methods *
            </label>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyCustomerBySms"
                name="notifyCustomerBySms"
                checked={formData.notifyCustomerBySms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notifyCustomerBySms" className="ml-2 block text-sm text-gray-900">
                Notify Customer by SMS
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyCustomerByEmail"
                name="notifyCustomerByEmail"
                checked={formData.notifyCustomerByEmail}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notifyCustomerByEmail" className="ml-2 block text-sm text-gray-900">
                Notify Customer by Email
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#002853] text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KycReviewModal; 