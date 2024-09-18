import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../common/context/useAuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AssignGroup = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const { request, authorizationService, clientid, setHeaders } = useAuthContext()

  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')
  const companyCode = localStorage.getItem('companyCode')
  setHeaders('Assign Group')

  // Axios instance with headers
  const axiosInstance = axios.create({
    baseURL: authorizationService,
    headers: {
      Authorization: `Bearer ${token}`,
      'request-source': request,
      'Username': email,
      'client-id': clientid,
    },
  })

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get('groups')
        const groupsArray = response.data.data
        const userGroupIds = await fetchUserGroups()
        const updatedGroups = processGroup(userGroupIds, groupsArray)
        setGroups(updatedGroups)
      } catch (error) {
        handleApiError(error)
      }
    }

    const fetchUserGroups = async () => {
      try {
        const response = await axiosInstance.get(`users/${id}/permissions`)
        return response.data.data.userGroups.map(group => group.groupId)
      } catch (error) {
        handleApiError(error)
      }
    }

    const processGroup = (userGroupIds, groupsArray) => {
      const groupIdSet = new Set(userGroupIds)
      return groupsArray.map(group => ({
        ...group,
        checked: groupIdSet.has(group.id),
      }))
    }

    fetchGroups()
  }, [id])

  const handleCheckboxChange = (groupId) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId ? { ...group, checked: !group.checked } : group
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const selectedGroupIds = groups
      .filter(group => group.checked)
      .map(group => group.id)

    try {
      const response = await axiosInstance.post('user/group/assign', {
        userId: id,
        companyCode,
        groupIds: selectedGroupIds,
      })
      toast.success(response.data.responseMessage)
      navigate('/ui/permission/alluser')
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleApiError = (error) => {
    const responseMessage = error.response?.data?.responseMessage
    if (
      responseMessage === 'Invalid/Expired Token' ||
      responseMessage === 'Invalid Token' ||
      responseMessage === 'Login Token Expired'
    ) {
      toast.error(responseMessage)
      localStorage.clear()
      navigate('/auth/login')
    } else if (responseMessage === 'Insufficient permission') {
      toast.error(responseMessage)
      navigate('/')
    } else {
      toast.error(responseMessage || 'An error occurred')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="my-4">
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
          <h4 className="text-2xl font-bold mb-1">Assign Group To A Staff</h4>
        </div>
        <div className="mt-8">
          <form className="space-y-4 bg-white p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {groups.map((group) => (
                <div key={group.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={group.id}
                    checked={group.checked || false}
                    onChange={() => handleCheckboxChange(group.id)}
                  />
                  <label htmlFor={group.id} className="ml-2">
                    {group.groupName}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                {loading ? 'Assigning Groups...' : 'Assign Groups'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AssignGroup
