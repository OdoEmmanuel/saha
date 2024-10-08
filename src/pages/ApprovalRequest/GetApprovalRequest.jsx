import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuthContext } from '../../common/context/useAuthContext'
import ApprovalModal from './ApprovalModal'
import { ArrowLeft } from 'lucide-react';


const GetApprovalRequest = () => {
    const { middleware, authorizationService, pending, request, clientid, setHeaders } = useAuthContext()
    const { id } = useParams()
    const [approval, setApproval] = useState('')
    const [data, setdata] = useState({})
    const [email, setemail] = useState('')
    const [phone, setPhone] = useState('')
    const [lang, setLang] = useState('')
    const [staff, setStaff] = useState('')
    const [status, setStatus] = useState('')
    const [user, setUser] = useState('')
    const [iemail, isetemail] = useState('')
    const [iphone, isetPhone] = useState('')
    const [ilang, isetLang] = useState('')
    const [istaff, isetStaff] = useState('')
    const [istatus, isetStatus] = useState('')
    const [iuser, isetUser] = useState('')
    const [final, setFinal] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    setHeaders('Approval Request Details')

    const open = () => {
        setOpenModal(true)
    }

    const close = () => {
        setOpenModal(false)
    }

    function removeUnderscoresAndSpaces(textWithUnderscores) {
        return textWithUnderscores.replace(/_/g, ' ');
    }

    function removeUnderscores(text) {
        return text.replace(/_/g, ' ')
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('email')
            try {
                const response = await axios.get(`${authorizationService}approvals/requests/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'request-source': request,
                        "Username": email,
                        'client-id': clientid,
                    },
                })

                const resp = response.data
                setApproval(resp.data.approvalItemType)
                setFinal(resp.data.finalState)
                if (resp.data.finalState === null) {
                    setemail('')
                    setPhone('')
                    setLang('')
                    setStaff('')
                    setStatus('')
                    setUser('')
                } else {
                    setemail(resp.data.finalState.email)
                    setPhone(resp.data.finalState.phone)
                    setLang(resp.data.finalState.lang)
                    setStaff(resp.data.finalState.staffName)
                    setStatus(resp.data.finalState.status)
                    setUser(resp.data.finalState.userType)
                }

                if (resp.data.initialState === null) {
                    isetemail('')
                    isetPhone('')
                    isetLang('')
                    isetStaff('')
                    isetStatus('')
                    isetUser('')
                } else {
                    isetemail(resp.data.initialState.email)
                    isetPhone(resp.data.initialState.phone)
                    isetLang(resp.data.initialState.lang)
                    isetStaff(resp.data.initialState.staffName)
                    isetStatus(resp.data.initialState.status)
                    isetUser(resp.data.initialState.userType)
                }

                setdata(resp.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                if (error.response) {
                    const errordata = error.response.data
                    if (errordata.responseCode === '400' || errordata.responseCode === '417') {
                        if (errordata.responseMessage === 'Invalid/Expired Token' || errordata.responseMessage === 'Invalid Token' || errordata.responseMessage === 'Login Token Expired') {
                            toast.error('invalid token')
                            navigate('/auth/login')
                            localStorage.clear();
                        } else if (errordata.responseMessage === 'Insufficient permission') {
                            toast.error(errordata.responseMessage)
                            navigate('/')
                        } else {
                            toast.error(errordata.responseMessage)
                        }
                    }
                    else if (errordata.responseCode === '500') {
                        if (errordata.responseMessage === "System Malfunction") {
                            toast.error(errordata.responseMessage)
                        }
                        else {
                            toast.error(errordata.responseMessage)
                        }
                    }
                    else {
                        toast.error(errordata.responseMessage)
                    }
                } else {
                    toast.error('An error occurred while fetching data')
                }
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className=' overflow-hidden px-8 py-4 mx-8'>
            {/* <PageBreadcrumb title="Basic Tables" subName="Table" /> */}
            {openModal && <ApprovalModal func={close} id={data.id} />}
            <div className='flex justify-between  bg-[#fff] rounded-[10px] shadow-lg p-8 mb-8'>
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate('/ui/approvalRequest')}
                        className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">Details</h1>
                </div>
                <div className='flex items-center'>
                                    {data.status === 'Pending' ? (
                                        <button
                                            className="text-white btn bg-[#072D56]   hover:bg-primary rounded-[10px] my-4 py-2 px-4"
                                            onClick={open}
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button className="text-white my-4 py-2 px-4 bg-[#4EC142] rounded-[10px]" disabled>
                                            Approved
                                        </button>
                                    )}
                                </div>
            </div>
            <div className=" gap-6 mb-8 p-8 bg-[#fff] rounded-[10px] shadow-lg">
                <div className="xl:col-span-3">
                    <div className="card h-full">
                        <div >
                           
                            <div className="overflow-x-auto">
                                <div className="min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <div className="grid sm:grid-cols-3 grid-cols-2 gap-7 lg:gap-x-7">
                                            <div className="mb-4 ">
                                                <h4 className=" mb-6 dark:text-gray-400   text-gray-900">
                                                    Approval Item Type
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.approvalItemType || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-6 dark:text-gray-400   text-gray-900 ">
                                                    Action
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.action || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-6   dark:text-gray-700   text-gray-900 ">
                                                    Description
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.description || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500  ">
                                                    Entity
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.entity || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500  ">
                                                    Status
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.status || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Comment
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.comment || '----'}
                                                </h4>
                                            </div>

                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Maker
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.maker || '----'}
                                                </h4>
                                            </div>

                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500  ">
                                                    Checker
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400 ">
                                                    {data?.mothersMaidenName || '----'}
                                                </h4>
                                            </div>

                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Contact Address
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.contactAddress || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Approval Required
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.approvalRequired || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Created At
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.createdAt || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Updated At
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.updatedAt || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Created By
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.createdBy || '----'}
                                                </h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className=" mb-2 text-gray-500 ">
                                                    Updated By
                                                </h4>
                                                <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                                    {data?.updatedBy || '----'}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {approval === 'User' ? (
                <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
                    <div className="xl:col-span-3">
                        <div className="">
                            <div className="card bg-[#fff] rounded-[10px] shadow-lg p-8" >
                                <div>
                                    <h3 className=" mb-8  text-xl">
                                        Inital State
                                    </h3>
                                </div>
                                <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Email
                                        </h4>
                                        <h4 className=" mb-6  text-gray-500 dark:text-gray-400">
                                            {iemail}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Phone
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {iphone}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Language
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {ilang}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            Staff Name
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {istaff}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            User Type
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {iuser}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            Status
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {istatus}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-[#fff] rounded-[10px] p-8 mt-8 shadow-lg">
                                <div>
                                    <h3 className=" mt-8 mb-8  text-xl">
                                        Final State
                                    </h3>
                                </div>
                                <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Email
                                        </h4>
                                        <h4 className="font-semibold mb-6 text-[20px]  text-gray-500 dark:text-gray-400">
                                            {email}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Phone
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {phone}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Language
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {lang}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            Staff Name
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {staff}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            User Type
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {user}
                                        </h4>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500  ">
                                            Status
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {status}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : approval === 'Group' ? (
                <div className="xl:col-span-3 bg-[#fff] rounded-[10px] shadow-lg p-8">
                    <div className="card">
                        <div >
                            <div>
                                <h3 className=" mb-8  text-xl">
                                    Final State
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-3 grid-cols-2 gap-6 ">
                                <div className="mb-4">
                                    <h4 className=" mb-2 text-gray-500 ">
                                        Group Name
                                    </h4>
                                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                        {final.groupName}
                                    </h4>
                                </div>
                                <div className="mb-4">
                                    <h4 className=" mb-2 text-gray-500 ">
                                        Description
                                    </h4>
                                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                        {final.description}
                                    </h4>
                                </div>
                                <div className="mb-4">
                                    <h4 className=" mb-2 text-gray-500 ">
                                        Staus
                                    </h4>
                                    <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                        {final.status}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : approval === 'UserGroupPermission' ? (
                <div className="xl:col-span-3 bg-[#fff] rounded-[10px] shadow-lg p-8">
                    <div className="card">
                        <div >
                            <div>
                                <h3 className=" mb-8  text-xl">
                                    Final State
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-3 grid-cols-2 gap-6 ">
                                {Object.entries(final).map(([group, value], index) => (
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Group {index + 1}
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {value}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : approval === 'GroupPermission' ? (
                <div className="xl:col-span-3 bg-[#fff] rounded-[10px] shadow-lg p-8">
                    <div className="card">
                        <div >
                            <div>
                                <h3 className=" mb-8 text-xl">
                                    Final State
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
                                {Object.entries(final).map(([group, value], index) => (
                                    <div className="mb-4">
                                        <h4 className=" mb-2 text-gray-500 ">
                                            Permisssion {index + 1}
                                        </h4>
                                        <h4 className=" font-semibold mb-6 text-[18px]  text-gray-500 dark:text-gray-400">
                                            {removeUnderscores(value)}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : approval === 'UserPermission' ? '' : ''}
        </div>
    )
}

export default GetApprovalRequest