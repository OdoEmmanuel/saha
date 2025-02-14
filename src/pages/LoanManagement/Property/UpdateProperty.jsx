import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../common/context/useAuthContext'
import { PulseLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";

const UpdateProperty = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [isLoading, setisLoading] = useState(false)
    const [propertyData, setPropertyData] = useState({
        propertyStatus: '',
        value: 0,
        documents: [],
        selectedDocTypes: [] // Changed from documentTypes to selectedDocTypes
    });
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const [selectedFiles, setSelectedFiles] = useState({});

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const images = []
    const names = []

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'client-id': clientid,
            // 'Content-Type': 'application/json',
            'request-source': request,
            'Username': email
        },
    };

    setHeaders('Update Property')

    useEffect(() => {
        setisLoading(true)
        axios.get(`${middleware}property/doc-types`, config)
            .then((res) => setDocumentTypes(res.data.data))
            .catch((error) => {
                if (error.response.data.responseMessage === 'Invalid/Expired Token' || error.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (error.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(error.response.data.responseMessage)
                    navigate('/')
                }
                else {
                    toast.error(error.response.data.responseMessage)
                }
            })
            .finally(() => {
                setisLoading(false)
            })

    }, [])

    useEffect(() => {
        setisLoading(true)
        axios.get(`${middleware}property/${id}`, config)
            .then((res) => {
                setPropertyData({
                    propertyStatus: res.data.data.statusMeaning || '',
                    value: res.data.data.value || 0,
                    documents: res.data.data.documents || [],
                    selectedDocTypes: res.data.data.documents?.map(doc => doc.typeId) || []
                });
            })
            .catch((error) => {
                if (error.response.data.responseMessage === 'Invalid/Expired Token' || error.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(error.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (error.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(error.response.data.responseMessage)
                    navigate('/')
                }
                else {
                    toast.error(error.response.data.responseMessage)
                }
            })
            .finally(() => {
                setisLoading(false)
            })
    },[])

    const handleDocTypeChange = (e) => {
        const docType = e.target.value;
        if (docType && !propertyData.selectedDocTypes.includes(docType)) {
            setPropertyData(prev => ({
                ...prev,
                selectedDocTypes: [...prev.selectedDocTypes, docType]
            }));
        }

        names.push(e.target.value)
    };

    const handleFileChange = (e, docType) => {
        setSelectedFiles(prev => ({
            ...prev,
            [docType]: e.target.files[0]
        }));
        images.push(e.target.files[0])
    };

    const handleRemoveDocType = (docTypeToRemove) => {
        setPropertyData(prev => ({
            ...prev,
            selectedDocTypes: prev.selectedDocTypes.filter(docType => docType !== docTypeToRemove)
        }));
        setSelectedFiles(prev => {
            const updatedFiles = { ...prev };
            delete updatedFiles[docTypeToRemove];
            return updatedFiles;
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setisLoading
        try {
            const formData = new FormData();
            formData.append('propertyStatus', propertyData.propertyStatus);
            formData.append('value', propertyData.value);
            Object.entries(selectedFiles).forEach(([docType, file],index) => {
                console.log(file)
                formData.append('documents[]', file);
                formData.append('documentTypes[]', docType);
            });

            axios.put(`${middleware}property/${id}`,formData,config)
            .then((res) => {
                toast.success('Property updated successfully');
                navigate(-1);
            })
            .catch((error) => {
                if (error.response.data.responseMessage === 'Invalid/Expired Token' || error.response.data.responseMessage === 'Invalid Token' || e.response.data.responseMessage === 'Login Token Expired') {
                    toast.error(e.response.data.responseMessage)
                    navigate('/auth/login')
                    localStorage.clear()
                }
                else if (error.response.data.responseMessage === 'Insufficient permission') {
                    toast.error(error.response.data.responseMessage)
                    navigate('/')
                }
                else {
                    toast.error(error.response.data.responseMessage)
                }
            })
            .finally(() => {
                setisLoading(false)
            })
        } catch (error) {
            
        }
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Property</h2>
                    <form className="space-y-6">
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemLevel"
                            >
                                Property Status
                            </label>
                            <div>


                                <select className="border-2 p-2 rounded-lg   w-full placeholder:text-gray-400"
                                    value={propertyData.propertyStatus}
                                    onChange={(e) => setPropertyData(prev => ({
                                        ...prev,
                                        propertyStatus: e.target.value
                                    }))}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Inspected">Inspected</option>
                                    <option value="InReview">In Review</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemType"
                            >
                                Property Value
                            </label>
                            <div>
                                <input
                                    type="number"
                                    id="approvalItemType"
                                    name="approvalItemType"
                                    className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                    value={propertyData.value}
                                    onChange={(e) => setPropertyData(prev => ({
                                        ...prev,
                                        value: e.target.value
                                    }))}

                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="block mb-2 font-semibold"
                                htmlFor="approvalItemLevel"
                            >
                                Property Status
                            </label>
                            <div>


                                <select className="border-2 p-2 rounded-lg   w-full placeholder:text-gray-400"
                                    onChange={handleDocTypeChange}
                                    value=""
                                >
                                    <option value="">Select document type</option>
                                    {documentTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {propertyData.selectedDocTypes.map((docType) => (
                            <div key={docType} className="relative p-4 border rounded">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDocType(docType)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                                <label className="block text-sm font-medium mb-1">
                                    {documentTypes.find(t => t.id === docType)?.name || docType}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, docType)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {propertyData.documents.find(doc => doc.typeId === docType) && (
                                    <p className="text-sm text-gray-500 mt-1 "  >
                                        Current file: {propertyData.documents.find(doc => doc.typeId === docType).name}
                                    </p>
                                )}
                            </div>
                        ))}


                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white bg-[#072D56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Update Properties'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProperty