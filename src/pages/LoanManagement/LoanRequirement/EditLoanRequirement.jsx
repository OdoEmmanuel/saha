import React, { useState, useEffect } from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from '../../../common/context/useAuthContext';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FaPen } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import InputField2 from '../../../components/InputField2';
import SelectField from '../../../components/SelectField';


const EditLoanRequirement = () => {
    const { middleware, authorizationService, request, clientid, setHeaders } = useAuthContext()
    const navigate = useNavigate()
    const [LoanProductCode, setLoanProductCode] = useState('')
    const [LoanTenure, setLoanTenure] = useState(0)
    const [minAmount, setMinAmount] = useState(0)
    const [minAmountForSpecialApproval, setMinAmountForSpecialApproval] = useState(0)
    const [comMode, setComMode] = useState(0)
    const [moratium, setMoratium] = useState(0)
    const [interest, setInterest] = useState(0)
    const [principal, setPricncipal] = useState(0)
    const [interestFreq, setInterestFreq] = useState(0)
    const [termsChecked, setTermsChecked] = useState(false)
    const [hasChecked, setHasChecked] = useState(false)
    const [homeChecked, setHomeChecked] = useState(false)
    const [noChecked, setNoChecked] = useState(false)
    const [monthlyChecked, setMonthlyChecked] = useState(false)
    const [name, setNameChecked] = useState(false)
    const [emailChecked, setEmailChecked] = useState(false)
    const [AddressChecked, setAddressChecked] = useState(false)
    const [roleChecked, setRoleChecked] = useState(false)
    const [statementChecked, setStatementChecked] = useState(false)
    const [cac, setCacChecked] = useState(false)
    const [govt, setGovtChecked] = useState(false)
    const [utility, setUtilityChecked] = useState(false)
    const [guarantor, setGuarantorChecked] = useState(false)
    const [guarantorId, setGuarantorId] = useState(false)
    const [guarantorPassport, setGuarantorPassportChecked] = useState(false)
    const [workId, setWorkIdChecked] = useState(false)
    const [confirm, setConfirmChecked] = useState(false)
    const [eligibity,setEglibility]=useState(false)
    const [remita, setRemita] = useState(false)
    const [salary, setSalary] = useState(false)
    const [loading, setLoading] = useState(false)
    const [guarantorEmailRequired, setGuarantorEmailRequired] = useState(false)
    const [guarantorPhoneNumberRequired, setGuarantorPhoneNumberRequired] = useState(false)
    const [guarantorDateOfBirthRequired, setGuarantorDateOfBirthRequired] = useState(false)
    const [guarantorOccupationRequired, setGuarantorOccupationRequired] = useState(false)
    const [guarantorResidentialAddressRequired, setGuarantorResidentialAddressRequired] = useState(false)
    const [guarantorOfficeAddressRequired, setGuarantorOfficeAddressRequired] = useState(false)
    const [maxAmount, setMaxAmount] = useState(0)
    const [error, setError] = useState('')
    const [product, setProduct] = useState([])
    const [tenure, setTenure] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const { id } = useParams()

    setHeaders('Update Loan Requirement')

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
        fetchData()
    }, [])

    const fetchData = () => {
        setisLoading(true)
        axios.get(`${middleware}loan/admin/requirements/${id}/detail`, config)
            .then((res) => {
               
                setLoanProductCode(res.data.data.loanProductCode)
                setMoratium(res.data.data.moratium)
                setMinAmount(res.data.data.minAmount)
                setMinAmountForSpecialApproval(res.data.data.minAmountForSpecialApproval)
                setLoanTenure(res.data.data.maxLoanTenure)
                setComMode(res.data.data.computationMode)
                setInterest(res.data.data.interestRate)
                setPricncipal(res.data.data.principalPaymentFrequency)
                setInterestFreq(res.data.data.interestPaymentFrequency)
                setTermsChecked(res.data.data.termsAndConditionAcceptedRequired)
                setHasChecked(res.data.data.hasExistingLoanWithOtherInstitutionRequired)
                setHomeChecked(res.data.data.homeOwnerRequired)
                setNoChecked(res.data.data.noOfDependentRequired)
                setMonthlyChecked(res.data.data.monthlyIncomeRequired)
                setNameChecked(res.data.data.businessNameRequired)
                setEmailChecked(res.data.data.businessEmailRequired)
                setAddressChecked(res.data.data.businessAddressRequired)
                setRoleChecked(res.data.data.businessRoleRequired)
                setStatementChecked(res.data.data.bankStatementRequired)
                setCacChecked(res.data.data.cacRequired)
                setGovtChecked(res.data.data.govtIssuedIdRequired)
                setUtilityChecked(res.data.data.utilityBillRequired)
                setRemita(res.data.data.remitaApplicationRequired)
                setGuarantorChecked(res.data.data.guarantorRequired)
                setGuarantorId(res.data.data.guarantorIdCardRequired)
                setGuarantorPassportChecked(res.data.data.guarantorPassportRequired)
                setGuarantorEmailRequired(res.data.data.guarantorEmailRequired)
                setGuarantorPhoneNumberRequired(res.data.data.guarantorPhoneNumberRequired)
                setGuarantorDateOfBirthRequired(res.data.data.guarantorDateOfBirthRequired)
                setGuarantorOccupationRequired(res.data.data.guarantorOccupationRequired)
                setGuarantorResidentialAddressRequired(res.data.data.guarantorResidentialAddressRequired)
                setGuarantorOfficeAddressRequired(res.data.data.guarantorOfficeAddressRequired)
                setMaxAmount(res.data.data.maxAmount)
                setWorkIdChecked(res.data.data.workIdCardRequired)
                setConfirmChecked(res.data.data.confirmationLetterRequired)
                setSalary(res.data.data.salaryStatementRequired)
                setEglibility(res.data.data.eligibilityCheckRequired)

            })
            .catch((e) => {
                


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

    useEffect(() => {
        const api1 = axios.get(`${middleware}loan/tenure`, config)
        const api2 = axios.get(`${middleware}loan/products/all`, config)

        setisLoading(true)

        Promise.all([api1, api2]).then(([response1, response2]) => {
            setTenure(response1.data.data)
            setProduct(response2.data.data)
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
    }, [])

    const handleGuarantorIdChecked = () => {
        setGuarantorId(!guarantorId)
    }

    const handleTermsChecked = (e) => {
        const isChecked = e.target.checked; // Get the checked status of the checkbox
        setTermsChecked(isChecked)
    }

    const handleHasChecked = () => {
        setHasChecked(!hasChecked)
    }

    const handleHomeChecked = () => {
        setHomeChecked(!homeChecked)
    }

    const handleNoChecked = () => {
        setNoChecked(!noChecked)
    }

    const handleMonthlyChecked = () => {
        setMonthlyChecked(!monthlyChecked)
    }

    const handleNameChecked = () => {
        setNameChecked(!name)
    }

    const handleEmailChecked = () => {
        setEmailChecked(!emailChecked)
    }

    const handleAddressChecked = () => {
        setAddressChecked(!AddressChecked)
    }

    const handleRoleChecked = () => {
        setRoleChecked(!roleChecked)
    }

    const handleStatementChecked = () => {
        setStatementChecked(!statementChecked)
    }

    const handleCacChecked = () => {
        setCacChecked(!cac)
    }

    const handleGovtChecked = () => {
        setGovtChecked(!govt)
    }

    const handleUtilityChecked = () => {
        setUtilityChecked(!utility)
    }

    const handleGuarantorChecked = () => {
        setGuarantorChecked(!guarantor)
    }

    const handleGuarantorPassportChecked = () => {
        setGuarantorPassportChecked(!guarantorPassport)
    }

    const handleWorkIdChecked = () => {
        setWorkIdChecked(!workId)
    }

    const handleConfirmChecked = () => {
        setConfirmChecked(!confirm)
    }

    const handleRemitaChecked = () => {
        setRemita(!remita)
    }


    const handleSalaryChecked = () => {
        setSalary(!salary)
    }

    const handleEligibility = () => {
        setEglibility(!eligibity)
    }

    const handleGuarantorEmailRequired = () => {
        setGuarantorEmailRequired(!guarantorEmailRequired)
    }

    const handleGuarantorPhoneNumberRequired = () => {
        setGuarantorPhoneNumberRequired(!guarantorPhoneNumberRequired)
    }

    const handleGuarantorDateOfBirthRequired = () => {
        setGuarantorDateOfBirthRequired(!guarantorDateOfBirthRequired)
    }

    const handleGuarantorOccupationRequired = () => {
        setGuarantorOccupationRequired(!guarantorOccupationRequired)
    }

    const handleGuarantorResidentialAddressRequired = () => {
        setGuarantorResidentialAddressRequired(!guarantorResidentialAddressRequired)
    }

    const handleGuarantorOfficeAddressRequired = () => {
        setGuarantorOfficeAddressRequired(!guarantorOfficeAddressRequired)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!LoanProductCode.trim) {
            setError('enter Loan Product Code')
        }

        const requestbody = {
            loanProductCode: LoanProductCode,
            termsAndCondition: 'Do you accept our terms or not',
            termsAndConditionAcceptedRequired: termsChecked,
            hasExistingLoanWithOtherInstitutionRequired: hasChecked,
            homeOwnerRequired: homeChecked,
            noOfDependentRequired: noChecked,
            monthlyIncomeRequired: monthlyChecked,
            businessNameRequired: name,
            businessEmailRequired: emailChecked,
            businessAddressRequired: AddressChecked,
            businessRoleRequired: roleChecked,
            bankStatementRequired: statementChecked,
            cacRequired: cac,
            govtIssuedIdRequired: govt,
            utilityBillRequired: utility,
            guarantorRequired: guarantor,
            guarantorIdCardRequired: guarantorId,
            guarantorPassportRequired: guarantorPassport,
            guarantorEmailRequired: guarantorEmailRequired,
            guarantorPhoneNumberRequired: guarantorPhoneNumberRequired,
            guarantorDateOfBirthRequired: guarantorDateOfBirthRequired,
            guarantorOccupationRequired: guarantorOccupationRequired,
            guarantorResidentialAddressRequired: guarantorResidentialAddressRequired,
            guarantorOfficeAddressRequired: guarantorOfficeAddressRequired,
            workIdCardRequired: workId,
            confirmationLetterRequired: confirm,
            remitaApplicationRequired: remita,
            maxLoanTenure: LoanTenure,
            minAmountForSpecialApproval: minAmountForSpecialApproval,
            minAmount: minAmount,
            maxAmount: maxAmount,
            computationMode: comMode,
            moratium: moratium,
            interestRate: interest,
            principalPaymentFrequency: principal,
            interestPaymentFrequency: interestFreq,
            salaryStatementRequired: salary,
            eligibilityCheckRequired:eligibity,
        }

        axios.post(`${middleware}loan/requirement`, requestbody, config)
            .then((res) => {

                toast.success(res.data.responseMessage)
                navigate(-1)
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

            <div className=" mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Loan Requirement</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-email"
                                >
                                    Loan Product Code
                                </label>
                                {/* <div>
                  <input
                    type="text"
                    id="example-email"
                    name="example-email"
                    value={LoanProductCode}
                    onChange={(e) => {
                      setLoanProductCode(e.target.value)
                    }}
                    className="form-input    w-full placeholder:text-gray-400"
                  />
                </div> */}
                                <div>
                                    <select
                                        className="border-2 p-2 rounded-lg    w-full placeholder:text-gray-400"
                                        value={LoanProductCode}
                                        onChange={(e) => {
                                            setLoanProductCode(e.target.value)
                                        }}
                                    >
                                        {product.map((item, index) => (
                                            <option key={index} value={item.productCode}>
                                                {item.productCode}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {error && <p className="text-red-500 ">{error}</p>}
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Max Loan Tenure
                                </label>
                                {/* <div>
                  <input
                    className="form-input w-full placeholder:text-gray-400"
                    type="number"
                    value={LoanTenure}
                    onChange={(e) => {
                      setLoanTenure(e.target.value)
                    }}
                    id="example-password"
                  />
                </div> */}
                                <div>
                                    <select
                                        className="border-2 p-2 rounded-lg   w-full placeholder:text-gray-400"
                                        value={LoanTenure}
                                        onChange={(e) => {
                                            setLoanTenure(e.target.value)
                                        }}
                                    >
                                        {tenure.map((item, index) => (
                                            <option key={index} value={item.tenure}>
                                                {item.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* <div className="mb-3">
                <label
                  className="block mb-2 font-semibold"
                  htmlFor="example-password"
                >
                  Min Amount For Special Approval
                </label>
                <div>
                  <input
                    className="form-input w-full placeholder:text-gray-400"
                    type="number"
                    id="example-password"
                    value={minAmount}
                    onChange={(e) => {
                      setMinAmount(e.target.value)
                    }}
                  />
                </div>
              </div> */}
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Computation Mode
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={comMode}
                                        onChange={(e) => {
                                            setComMode(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Moratium
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={moratium}
                                        onChange={(e) => {
                                            setMoratium(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Min Amount for Special Approval
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={minAmountForSpecialApproval}
                                        onChange={(e) => {
                                            setMinAmountForSpecialApproval(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Min Amount
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={minAmount}
                                        onChange={(e) => {
                                            setMinAmount(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Max Amount
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={maxAmount}
                                        onChange={(e) => {
                                            setMaxAmount(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Interest Rate
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={interest}
                                        onChange={(e) => {
                                            setInterest(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Principal Payment Frequency
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={principal}
                                        onChange={(e) => {
                                            setPricncipal(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor="example-password"
                                >
                                    Interest Payment Frequency
                                </label>
                                <div>
                                    <input
                                        className="border-2 p-2 rounded-lg w-full placeholder:text-gray-400"
                                        type="number"
                                        id="example-password"
                                        value={interestFreq}
                                        onChange={(e) => {
                                            setInterestFreq(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-10 gap-y-4 mt-4 place-items-start">
                            <div className="flex items-center gap-x-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Do you accept our terms or not
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={termsChecked}
                                    onChange={handleTermsChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Has Existing Loan With Other Institution
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={hasChecked}
                                    onChange={handleHasChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Home Owner
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={homeChecked}
                                    onChange={handleHomeChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    No Of Dependent
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={noChecked}
                                    onChange={handleNoChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Monthly Income
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={monthlyChecked}
                                    onChange={handleMonthlyChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Business Name
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={name}
                                    onChange={handleNameChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Business Email
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={emailChecked}
                                    onChange={handleEmailChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Business Address
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={AddressChecked}
                                    onChange={handleAddressChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Business Role
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={roleChecked}
                                    onChange={handleRoleChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Bank Statement
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={statementChecked}
                                    onChange={handleStatementChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    CAC Required
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={cac}
                                    onChange={handleCacChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Govt IssuedId
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={govt}
                                    onChange={handleGovtChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Utility Bill
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={utility}
                                    onChange={handleUtilityChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantor}
                                    onChange={handleGuarantorChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor IdCard
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorId}
                                    onChange={handleGuarantorIdChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Passport
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorPassport}
                                    onChange={handleGuarantorPassportChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Email
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorEmailRequired}
                                    onChange={handleGuarantorEmailRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Phone Number
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorPhoneNumberRequired}
                                    onChange={handleGuarantorPhoneNumberRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Date Of Birth
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorDateOfBirthRequired}
                                    onChange={handleGuarantorDateOfBirthRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Occupation
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorOccupationRequired}
                                    onChange={handleGuarantorOccupationRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Residential Address
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorResidentialAddressRequired}
                                    onChange={handleGuarantorResidentialAddressRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Guarantor Office Address
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={guarantorOfficeAddressRequired}
                                    onChange={handleGuarantorOfficeAddressRequired}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Work Id Card
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={workId}
                                    onChange={handleWorkIdChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Confirmation Letter
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={confirm}
                                    onChange={handleConfirmChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Remita Application
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={remita}
                                    onChange={handleRemitaChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                    Salary Statement
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={salary}
                                    onChange={handleSalaryChecked}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <label
                                    className="form-check-label font-semibold"
                                    htmlFor="customCheck3"
                                >
                                     Eligibility Check
                                </label>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-lg"
                                    id="customCheck3"
                                    checked={eligibity}
                                    onChange={handleEligibility}
                                />
                            </div>
                        </div>
                        <div className="flex justify-">
                            <button
                                type="submit"
                                className="text-white btn bg-[#072D56] rounded-[10px] px-5 py-2"
                                onClick={handleSubmit}
                            >
                                {isLoading ? 'loading...' : 'submit'}
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditLoanRequirement