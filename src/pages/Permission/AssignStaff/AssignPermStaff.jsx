import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../common/context/useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AssignPermission = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissionIds, setSelectedPermissionIds] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { request, clientid, authorizationService, setHeaders } = useAuthContext();
    const email = localStorage.getItem('email');
    setHeaders('Assign Permission to A Staff')

    function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }

    const redirectUrl = location.state?.from.pathname || '/ui/permission/alluser';

    const { handleSubmit } = useForm({
        defaultValues: {
            permissionIds: [],
        },
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Create axios instance with default headers
        const axiosInstance = axios.create({
            baseURL: authorizationService,
            headers: {
                Authorization: `Bearer ${token}`,
                'request-source': request,
                'Username': email,
                'client-id': clientid,
            },
        });

        const fetchPermission = async () => {
            try {
                const response = await axiosInstance.get('permissions');
                const permissionsData = response.data;
                setPermissions(permissionsData.data);
                return permissionsData.data;
            } catch (error) {
                handleApiError(error);
                console.error('Error fetching permissions:', error);
                toast.error('Failed to fetch permissions', { position: 'top-right' });
            }
        };

        const fetchIndividualPermission = async () => {
            try {
                const response = await axiosInstance.get(`users/${id}/permissions`);
                const permissionsData = response.data;
                const userPermissionIds = permissionsData.data.userPermissions.map(
                    (permission) => permission.permissionId
                );
                return userPermissionIds;
            } catch (error) {
                handleApiError(error);
                console.error('Error fetching individual permissions:', error);
                toast.error('Failed to fetch individual permissions', {
                    position: 'top-right',
                });
                throw error;
            }
        };

        const processPermissions = (userPermissionIds, permissionsArray) => {
            try {
                const permissionIdSet = new Set(userPermissionIds);
                const updatedPermissions = permissionsArray.map((permission) => ({
                    ...permission,
                    checked: permissionIdSet.has(permission.permissionId),
                }));
                setPermissions(updatedPermissions);
            } catch (error) {
                console.error('Error processing permissions:', error);
                toast.error('Failed to process permissions', { position: 'top-right' });
            }
        };

        const fetchData = async () => {
            try {
                const permissionsArray = await fetchPermission();
                const userPermissionIds = await fetchIndividualPermission();
                processPermissions(userPermissionIds, permissionsArray);
            } catch (error) {
                console.error('Error fetching and processing data:', error);
                toast.error('Failed to fetch and process data', {
                    position: 'top-right',
                });
            }
        };

        fetchData();
    }, [authorizationService, clientid, email, id, navigate, request]);

    const handleCheckboxChange = (permissionId) => {
        setPermissions((prevPermissions) =>
            prevPermissions.map((permission) =>
                permission.permissionId === permissionId
                    ? { ...permission, checked: !permission.checked }
                    : permission
            )
        );

        setSelectedPermissionIds((prevIds) => ({
            ...prevIds,
            [permissionId]: !prevIds[permissionId],
        }));
    };

    const onSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const companyCode = localStorage.getItem('companyCode');

        const axiosInstance = axios.create({
            baseURL: authorizationService,
            headers: {
                Authorization: `Bearer ${token}`,
                'client-id': clientid,
                'Content-Type': 'application/json',
                'request-source': request,
                'Username': email,
            },
        });

        const selectedIds = permissions
            .filter((permission) => permission.checked)
            .map((permission) => permission.permissionId);

        try {
            const response = await axiosInstance.post('user/permission/assign', {
                userId: id,
                companyCode: companyCode,
                permissionIds: selectedIds,
            });

            const responseData = response.data;
            toast.success(responseData.responseMessage, {
                position: 'top-right',
            });
        } catch (error) {
            handleApiError(error);
            console.error('Error assigning permissions:', error);
            toast.error('An error occurred while assigning permissions', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    //   const handleApiError = (error) => {

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
    //     if (error.response) {
    //       const errordata = error.response.data;
    //       if (errordata.responseCode === '400' || errordata.responseCode === '417') {
    //         if (
    //           errordata.responseMessage === 'Invalid/Expired Token' ||
    //           errordata.responseMessage === 'Invalid Token' ||
    //           errordata.responseMessage === 'Login Token Expired'
    //         ) {
    //           toast.error('invalid token');
    //           navigate('/auth/login');
    //           localStorage.clear();
    //         } else if (errordata.responseMessage === 'Insufficient permission') {
    //           toast.error(errordata.responseMessage);
    //           navigate('/');
    //         } else {
    //           toast.error(errordata.responseMessage);
    //         }
    //       } else if (errordata.responseCode === '500') {
    //         toast.error(errordata.responseMessage);
    //       } else {
    //         toast.error(errordata.responseMessage || 'An error occurred');
    //       }
    //     } else {
    //       toast.error('An error occurred');
    //     }
    //   };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 m-8">
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
                    <h4 className="text-2xl font-bold mb-1 dark:text-gray-300 text-left">
                        Assign Permission to Group
                    </h4>
                </div>

                <div className="mt-2 bg-white p-2">
                   
                    <form
                        className="space-y-5 p-1 grid grid-cols-2 lg:grid-cols-3 gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {permissions.map((permission) => (
                            <div key={permission.permissionId} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={permission.permissionId}
                                    className='w-4 h-4 rounded-lg'
                                    checked={permission.checked || false}
                                    value={permission.permissionId}
                                    onChange={() => handleCheckboxChange(permission.permissionId)}
                                />
                                <label htmlFor={permission.permissionId} className="ml-1 form-check-label font-semibold">
                                    <p>{removeUnderscores(permission.permission)}</p>
                                </label>
                            </div>
                        ))}
                        <div className="lg:col-span-3"></div>


                        <div className="mt-6">
                            <button
                                disabled={loading}
                                className="px-4 py-2 bg-[#072D56] text-white rounded-lg"
                                type="submit"
                            >
                                {loading ? 'Assigning Permissions...' : 'Assign Permissions'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignPermission;
