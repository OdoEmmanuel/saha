import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../common/context/useAuthContext'
import axios from 'axios'


const SetSystem = () => {
    const { middleware, authorizationService, request, clientid } = useAuthContext()
    const [settings, setSettings] = useState([])
    const [dropdownOptions, setDropdownOptions] = useState({})
    const superAdminKey = 'super_admin_emails'
    const superAdminValue = localStorage.getItem('email')
    const email = localStorage.getItem('email')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const headers = {
          Authorization: `Bearer ${token}`,
          'request-source': request,
          Username: email,
          'client-id': clientid,
          'Content-Type': 'application/json',
        }
    
        // Fetch settings from the first API
        axios.get(`${authorizationService}settings`, { headers })
          .then((response) => {
            setSettings(response.data.data || [])
          })
          .catch((error) => {
            // console.error('Error fetching data from API: ', error)
          })
    
        // Fetch dropdown options from another endpoint
        axios.get(`${authorizationService}settings/key-values`, { headers })
          .then((response) => {
            setDropdownOptions(response.data.data || {})
          })
          .catch((error) => {
            // console.error('Error fetching dropdown options: ', error)
          })
      }, [])

      const handleInputChange = (event, setting) => {
        const { value } = event.target
        setSettings((prevSettings) => {
          return prevSettings.map((s) => s.key === setting ? { ...s, value } : s)
        })
      }


      const handleFormSubmit = (settingKey) => {
        const token = localStorage.getItem('token')
        const setting = settings.find((s) => s.key === settingKey)
        const payload = { key: setting.key, value: setting.value }
    
        axios.post(`${authorizationService}settings/save`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'request-source': request,
            Username: email,
            'client-id': clientid,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            const data = response.data
            if (data.responseMessage === 'Successful') {
              toast.success('Successful', { position: 'top-right' })
              setSettings((prevSettings) => {
                return prevSettings.map((s) => s.key === settingKey ? { ...s, value: setting.value } : s)
              })
            } else {
              handleErrorResponse(data)
            }
          })
          .catch((error) => {
           
            toast.error(error.response?.data?.responseMessage || 'An error occurred', { position: 'top-right' })
          })
      }


      const handleAllSetting = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const settingsPayload = settings.map(({ key, value }) => ({ key, value }))
        const payload = {
          data: [
            ...settingsPayload,
            { key: superAdminKey, value: superAdminValue },
          ]
        }
    
        axios.post(`${authorizationService}settings/all/save`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'request-source': request,
            Username: email,
            'client-id': clientid,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            const data = response.data
            if (data.responseMessage === 'Successful') {
              toast.success('Successful', { position: 'top-right' })
            } else {
              handleErrorResponse(data)
            }
          })
          .catch((error) => {
            
            toast.error(error.response?.data?.responseMessage || 'An error occurred', { position: 'top-right' })
          })
      }


      const handleErrorResponse = (data) => {
        if (['Invalid/Expired Token', 'Invalid Token', 'Login Token Expired'].includes(data.responseMessage)) {
          toast.error(data.responseMessage)
          navigate('/auth/login')
        } else if (data.responseMessage === 'Insufficient permission') {
          toast.error(data.responseMessage)
          navigate('/')
        } else if (data.responseCode === '500') {
          toast.error(data.responseMessage)
        } else {
          toast.error(data.responseMessage)
        }
      }
    
      const formatSettingKey = (key) => {
        return key
          .split('_')
          .map((word) => word.charAt(0).to() + word.slice(1))
          .join(' ')
      }

      function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }
    
    
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#fff] shadow-md p-6 lg:w-1/2 w-full rounded-[10px]">
        {settings.map((setting) => (
          <div key={setting.key} className="m-4 flex flex-col justify-between">
            <div className='capitalize'> 
              <p>{removeUnderscores(setting.key)}:</p>
            </div>
            <div className="flex items-center">
              {setting.key.endsWith('_state') && dropdownOptions[setting.key] ? (
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md mr-2 w-full"
                  value={setting.value || ''}
                  onChange={(event) => handleInputChange(event, setting.key)}
                >
                  {dropdownOptions[setting.key].map((option) => (
                    <option className="w-[200px]" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md mr-2 w-full"
                  value={setting.value || ''}
                  onChange={(event) => handleInputChange(event, setting.key)}
                />
              )}
              <button
                type="button"
                className="bg-[#072D56] text-white px-4 py-2 rounded-md"
                onClick={() => handleFormSubmit(setting.key)}
              >
                Save
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end align-end">
          <button
            type="button"
            className="bg-[#072D56] text-white px-4 py-2 rounded-md mt-4"
            onClick={handleAllSetting}
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetSystem