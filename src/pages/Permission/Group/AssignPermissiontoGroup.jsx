import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../common/context/useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const AssignGroupPermission = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, request, clientid, middleware, authorizationService, setHeaders } = useAuthContext()

  const redirectUrl = location.state?.from.pathname || '/ui/permission/allgroup'

  setHeaders('Assign Permission to Group')

  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  // Create an axios instance with default headers
  const axiosInstance = axios.create({
    baseURL: authorizationService,
    headers: {
      Authorization: `Bearer ${token}`,
      'request-source': request,
      'Username': email,
      'client-id': clientid,
    },
  })

  function removeUnderscores(text) {
    return text.replace(/_/g, ' ')
  }

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await axiosInstance.get('permissions')
        setPermissions(response.data.data)
        return response.data.data
      } catch (error) {
        handleApiError(error)
      }
    }

    const fetchIndividualPermission = async () => {
      try {
        const response = await axiosInstance.get(`groups/${id}/permissions`)
        return response.data.data.map(permission => permission.permissionId)
      } catch (error) {
        handleApiError(error)
      }
    }

    const processPermissions = (userPermissionIds, permissionsArray) => {
      const permissionIdSet = new Set(userPermissionIds)
      return permissionsArray.map(permission => ({
        ...permission,
        checked: permissionIdSet.has(permission.id)
      }))
    }

    const fetchData = async () => {
      try {
        const permissionsArray = await fetchPermission()
        const userPermissionIds = await fetchIndividualPermission()
        const updatedPermissions = processPermissions(userPermissionIds, permissionsArray)
        setPermissions(updatedPermissions)
      } catch (error) {
        console.error('Error fetching and processing data:', error)
        toast.error('Failed to fetch and process data', { position: 'top-right' })
      }
    }

    fetchData()
  }, [])

  const handleCheckboxChange = (permissionId) => {
    setPermissions(prevPermissions => prevPermissions.map(permission => 
      permission.id === permissionId ? { ...permission, checked: !permission.checked } : permission
    ))
  }

  const onSubmit = async () => {
    setLoading(true)
    const companyCode = localStorage.getItem('companyCode')

    const selectedPermissionIds = permissions.filter(permission => permission.checked).map(permission => permission.id)

    try {
      const response = await axiosInstance.post('group/permission/assign', {
        groupId: id,
        companyCode: companyCode,
        permissionIds: selectedPermissionIds,
      })

      toast.success(response.data.responseMessage, { position: 'top-right' })
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApiError = (error) => {
    console.log(error.response?.data?.responseMessage)
    const responseMessage = error.response?.data?.responseMessage;
    if (responseMessage === 'Invalid/Expired Token' || responseMessage === 'Invalid Token' || responseMessage === 'Login Token Expired') {
        toast.error(responseMessage);
        navigate('/auth/login');
        localStorage.clear();
    } else if (responseMessage === 'Insufficient permission') {
        toast.error(responseMessage);
        navigate('/');
    } else {
        toast.error(responseMessage || 'An error occurred');
    }
  };

  return (
    <div className="bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8">
      <div className="flex">
        <button onClick={() => navigate(-1)} className="mb-6 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            className="svg"
          >
            <path
              d="M8.29289 16.2929C7.90237 16.6834 7.90237 17.3166 8.29289 17.7071L14.6569 24.0711C15.0474 24.4616 15.6805 24.4616 16.0711 24.0711C16.4616 23.6805 16.4616 23.0474 16.0711 22.6569L10.4142 17L16.0711 11.3431C16.4616 10.9526 16.4616 10.3195 16.0711 9.92893C15.6805 9.53841 15.0474 9.53841 14.6569 9.92893L8.29289 16.2929ZM25 16L9 16V18L25 18V16Z"
              fill="#000"
            />
            <circle cx="16.5" cy="16.5" r="16" stroke="#000" />
          </svg>
        </button>
        <h4 className="text-2xl font-bold mb-1 dark:text-gray-300 text-left">
          Assign Permission to Group
        </h4>
      </div>

      <div className="my-2 bg-white">
        <div className="mt-4">
          <p className="text-gray-500 dark:text-gray-400 text-left text-lg py-3 px-6">
            Enter Permission Details
          </p>
          <form
            className="space-y-5 grid grid-cols-2 lg:grid-cols-3 p-3 place-items-start gap-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="rounded-md flex items-center mx-2"
              >
                <input
                  type="checkbox"
                  id={permission.id}
                  checked={permission.checked}
                  onChange={() => handleCheckboxChange(permission.id)}
                />
                <label htmlFor={permission.id} className="ml-1">
                  {removeUnderscores(permission.permission)}
                </label>
              </div>
            ))}
            <div className="lg:col-span-3 mt-6">
              <button
                disabled={loading}
                className="bg-[#072D56] py-2 px-4 rounded-lg text-white w-full"
                type="submit"
              >
                {loading ? 'Assigning Permissions...' : 'Assign Permissions'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AssignGroupPermission