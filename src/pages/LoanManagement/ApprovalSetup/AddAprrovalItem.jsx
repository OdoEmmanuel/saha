import React, { useEffect, useState } from 'react'
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../../common/context/useAuthContext'
import axios from 'axios'
import { BiArrowBack } from "react-icons/bi";
import Select from 'react-select'


const AddAprrovalItem = () => {

    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [items, setItems] = useState([])
    const [staffs, setStaff] = useState([])
    const [approvalItemLevel, setApprovalItemLevel] = useState('')
    const [approvalItemType, setApprovalItemType] = useState('')
    const [selectedValues, setSelectedValues] = useState({})
    const [selectedAmount, setSelectedAmount] = useState({})
    const [sets, setSets] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()

    setHeaders('Add Approval Item')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };


    useEffect(() => {
        const api1 = axios.get(`${authorizationService}approvals/item/types`, config)
        const api2 = axios.post(`${authorizationService}user`, null, config)

        setisLoading(true)

        Promise.all([api1, api2]).then(([response1, response2]) => {
            setItems(response1.data.data)
            setStaff(response2.data.data)
        }).catch((e) => {
            console.log(e.response.data.responseMessage)


            if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                toast.error(e.response.data.responseMessage)
                navigate('/auth/login')
                localStorage.clear()
            }
            else if (e.response.data.responseMessage === 'Insufficient permission') {
                toast.error(e.response.data.responseMessage)
                navigate('/')
            }
            else {
                toast.error(e.response.data.responseMessage)
            }
        }).finally(() => {
            setisLoading(false)
        })
    }, [])

    const handleApprovalLevelChange = (e) => {
        const level = parseInt(e.target.value)
        setApprovalItemLevel(level)

        // Create sets based on the entered level
        const newSets = Array.from({ length: level }, (_, index) => index + 1)
        setSets(newSets)

        // Reset selected options for the new approval level
    }

    const handleChange = (newValue, index) => {
        // if (selectedValues.length === 0) {
        // }

        setSelectedValues((prevValues) => ({
            ...prevValues,
            approvalStageStaffIds: {
                ...prevValues.approvalStageStaffIds,
                [index]: newValue,
            },
        }))

    }

    const handleAmountChange = (newValue, index) => {
        // if (selectedValues.length === 0) {
        // }

        setSelectedAmount((prevValues) => ({
            ...prevValues,
            approvalStageAmounts: {
                ...prevValues.approvalStageAmounts,
                [index]: newValue,
            },
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let stringRepresentation = '{'
        for (const key in selectedValues.approvalStageStaffIds) {
            if (selectedValues.approvalStageStaffIds.hasOwnProperty(key)) {
                stringRepresentation +=
                    key +
                    ': [' +
                    selectedValues.approvalStageStaffIds[key].join(',') +
                    '], '
            }
        }
        stringRepresentation = stringRepresentation.slice(0, -2) // Remove the trailing comma and space
        stringRepresentation += '} '


        let stringData = "{";
        for (const key in selectedAmount.approvalStageAmounts) {
            if (selectedAmount.approvalStageAmounts.hasOwnProperty(key)) {
                stringData += key + ": " + selectedAmount.approvalStageAmounts[key] + ", ";
            }
        }
        stringData = stringData.slice(0, -2); // Remove the trailing comma and space
        stringData += "} "

        const requestBody = {
            approvalItemType: approvalItemType,
            approvalLevels: approvalItemLevel,
            approvalStageStaffIds: stringRepresentation,
            approvalStageAmounts: stringData,
        }

        setisLoading(true)

        axios.post(`${authorizationService}approvals/item/setup`, requestBody, config)
            .then((res) => {
                toast.success('Sucessfull')
                setApprovalItemLevel('')
                setApprovalItemType('')
                setSelectedValues({})
                setSelectedAmount({})
            })
            .catch((e) => {
                // console.log(e.response.data.responseMessage)
                if (e.response.data.responseMessage === 'Invalid/Expired Token' || e.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (e.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/')
                }
                else {
                    toast.error(e.response.data.responseMessage)
                }
            }).finally(() => {
                setisLoading(false)
            })
    }


    return (
        <div className=" bg-gray-100 ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Approval Item</h2>
                    <form className="space-y-6">
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemLevel"
                            >
                                Approval Item Type
                            </label>
                            <div>
                                <select
                                    id="approvalItemLevel"
                                    className="border-2 p-2 rounded-lg w-full form-select-sm"
                                    value={approvalItemType}
                                    onChange={(e) => {
                                        setApprovalItemType(e.target.value)
                                    }}
                                >
                                    <option value="">Select Approval Item Level</option>
                                    {items.map((it, idx) => (
                                        <option key={idx} value={it}>
                                            {it}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemType"
                            >
                                Approval Item level
                            </label>
                            <div>
                                <input
                                    type="number"
                                    id="approvalItemType"
                                    name="approvalItemType"
                                    className="border-2 p-2 rounded-lg  w-full placeholder:text-gray-400"
                                    onChange={handleApprovalLevelChange}
                                    value={approvalItemLevel}
                                    placeHolder={`E`}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            {sets.map((setNumber, index) => (
                                <div key={index}>
                                    {/* <Set />
                  <MultiSelect
                    options={staffs.map((staff) => ({
                      label: staff.staffName,
                      value: staff.id,
                    }))}
                    value={selectedValues[]} // Set default value
                    onChange={(newValue) => handleChange(newValue, index)}
                    
                  /> */}
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 font-semibold"
                                            htmlFor="example-email"
                                        >
                                            Approval Stage Amounts
                                        </label>
                                        <div>
                                            <input
                                                type="number"
                                                value={selectedAmount[index + 1]}
                                                id="example-email"
                                                name="example-email"
                                                className="border-2 p-2 rounded-lg    w-full placeholder:text-gray-400"
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value)
                                                    handleAmountChange(value, index + 1)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 font-semibold"
                                            htmlFor="example-email"
                                        >
                                            Approval Stage Staff Id
                                        </label>
                                        <div>
                                            <Select
                                                isMulti
                                                options={staffs.map((staff) => ({
                                                    label: staff.staffName,
                                                    value: staff.id,
                                                }))}
                                                value={selectedValues[index + 1]}
                                                onChange={(e) => {
                                                    const newValue = e.map((item, index) => {
                                                        return item.value
                                                    })
                                                    handleChange(newValue, index + 1)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#072D56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add Approval Item'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddAprrovalItem