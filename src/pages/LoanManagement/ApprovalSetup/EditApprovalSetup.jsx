import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../common/context/useAuthContext'
import axios from 'axios'
import { BiArrowBack } from "react-icons/bi";
import { PulseLoader } from "react-spinners";

const EditApprovalSetup = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const [data, setData] = useState({})
    const [items, setItems] = useState([])
    const [staffs, setStaff] = useState([])
    const [approvalItemLevel, setApprovalItemLevel] = useState('')
    const [approvalItemType, setApprovalItemType] = useState('')
    const [selectedValues, setSelectedValues] = useState({})
    const [selectedAmount, setSelectedAmount] = useState({})
    const [isLoading, setisLoading] = useState(false);
    const [sets, setSets] = useState([])
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')


    const navigate = useNavigate()
    let { id } = useParams()

    setHeaders('Update Approval Item')

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
        const fetchAllData = async () => {
            setisLoading(true);
            try {
                // Fetch staff and items data
                const [itemsResponse, staffResponse] = await Promise.all([
                    axios.get(`${authorizationService}approvals/item/types`, config),
                    axios.post(`${authorizationService}user`, null, config)
                ]);

                setItems(itemsResponse.data.data);
                setStaff(staffResponse.data.data);

                // Fetch approval setup data
                const setupResponse = await axios.get(`${authorizationService}approvals/item/setup/${id}`, config);
                const setupData = setupResponse.data.data;

                setApprovalItemLevel(setupData.approvalLevels);
                setApprovalItemType(setupData.approvalItemType);
                const level = parseInt(setupData.approvalLevels);

                const newSets = Array.from({ length: level }, (_, index) => index + 1);
                setSets(newSets);
                setData(setupData.approvalStageStaffIds);

                const result = Object.keys(setupData.approvalStageStaffIds).reduce((acc, key) => {
                    const values = setupData.approvalStageStaffIds[key];
                    const d = staffResponse.data.data
                        .filter((staff) => values.includes(staff.id))
                        .map(({ id }) => id);
                    acc[key] = d;
                    return acc;
                }, {});

                setSelectedValues(prevState => {
                    const mergedValues = { ...prevState };
                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            mergedValues[key] = result[key];
                        }
                    }
                    return mergedValues;
                });

                setSelectedAmount(setupData.approvalStageAmounts);
            } catch (error) {
                handleError(error);
            } finally {
                setisLoading(false);
            }
        };

        fetchAllData();
    }, [id, authorizationService]);

    const handleError = (e) => {
       
        const errorMessage = e.response?.data?.responseMessage;
        if (errorMessage === 'Invalid/Expired Token' || errorMessage === 'Invalid Token' || errorMessage === 'Login Token Expired') {
            toast.error(errorMessage);
            navigate('/auth/login');
            localStorage.clear();
        } else if (errorMessage === 'Insufficient permission') {
            toast.error(errorMessage);
            navigate('/');
        } else {
            toast.error(errorMessage || 'An error occurred');
        }
    };

    const handleApprovalLevelChange = (e) => {
        const level = parseInt(e.target.value)
        setApprovalItemLevel(level)

        // Create sets based on the entered level
        const newSets = Array.from({ length: level }, (_, index) => index + 1)
        setSets(newSets)

    }


    const handleChange = (e, index) => {
        const newValue = e.map((item, i) => {
            return item.value;
        });

        setSelectedValues((prevValues) => ({
            ...prevValues,
            [index]: newValue,
        }));

    };

    const handleAmountChange = (newValue, index) => {
        setSelectedAmount((prevValues) => ({
            ...prevValues,
            [index]: newValue,
        }));

    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        let stringRepresentation = '{'
        for (const key in selectedValues) {
            if (selectedValues.hasOwnProperty(key)) {
                stringRepresentation +=
                    key +
                    ': [' +
                    selectedValues[key].join(',') +
                    '], '
            }
        }
        stringRepresentation = stringRepresentation.slice(0, -2) // Remove the trailing comma and space
        stringRepresentation += '} '


        let stringData = '{'
        for (const key in selectedAmount) {
            if (selectedAmount.hasOwnProperty(key)) {
                stringData +=
                    key + ': ' + selectedAmount[key] + ', '
            }
        }
        stringData = stringData.slice(0, -2) // Remove the trailing comma and space
        stringData += '} '

        const requestBody = {
            approvalItemType: approvalItemType,
            approvalLevels: approvalItemLevel,
            approvalStageStaffIds: stringRepresentation,
            approvalStageAmounts: stringData,
        }

        axios.post(`${authorizationService}approvals/item/setup`, requestBody, config)
            .then((res) => {
                toast.success('Sucessfull')
                setApprovalItemLevel('')
                setApprovalItemType('')
                setSelectedValues({})
                setSelectedAmount({})
                navigate(-1)
            }).catch((e) => {
               


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
                <div className='px-6 py-8'>
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Approval Item</h2>
                    <form className="space-y-6">
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemLevel"
                            >
                                Approval Item Type
                            </label>
                            <div>


                                <input
                                    className="border-2 p-2 rounded-lg  w-full placeholder:text-gray-400"
                                    value={approvalItemType}
                                    disabled
                                />
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
                                    className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                    onChange={handleApprovalLevelChange}
                                    value={approvalItemLevel}
                                    placeholder="Type In the Approval Level"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            {sets.map((setNumber, index) => {
                                const options = staffs.map((staff) => ({
                                    label: staff.staffName,
                                    value: staff.id,
                                }));


                                const result = Object.keys(data).reduce((acc, key) => {
                                    const values = data[key];
                                    const d = staffs
                                        .filter((staff) => values.includes(staff.id))
                                        .map(({ id }) => id);
                                    acc[key] = d;
                                    return acc;
                                }, {});

                                return (
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
                                                Approval Stage Amounts {`(level ${index + 1})`}
                                            </label>
                                            <div>
                                                <input
                                                    type="number"
                                                    defaultValue={selectedAmount[index + 1]}
                                                    id="example-email"
                                                    name="example-email"
                                                    className="border-2 p-2 rounded-lg     w-full placeholder:text-gray-400"
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
                                                Approval Stage Staff Id {`(level ${index + 1})`}
                                            </label>
                                            <div>
                                                <Select
                                                    isMulti
                                                    options={options}
                                                    defaultValue={options.filter((option) =>
                                                        (selectedValues[index + 1] || []).includes(option.value)
                                                    )}

                                                    onChange={(e) => {

                                                        handleChange(e, index + 1)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white bg-[#072D56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Createing...' : 'Update Approval Item'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditApprovalSetup