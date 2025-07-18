import {useState} from 'react'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'
import {  Routes, Route, Navigate } from 'react-router-dom';
import AllCustomer from '../pages/customers/AllCustomer';
import ViewCustomerdetails from '../pages/customers/ViewCustomer/ViewCustomerdetails';
import ActiveCustomer from '../pages/customers/ActiveCustomer';
import BlockCustomer from '../pages/customers/BlockCustomer';
import MobileSidebar from './MobileSidebar';
import PendingKyc from '../pages/customers/PendingKyc';
import ViewPendingKycdetail from '../pages/customers/ViewPendingKyc/ViewPendingKycdetail';
import CreateStaff from '../pages/Staff/AddStaff';
import AllStaff from '../pages/Staff/AllStaff';
import UpdateStaff from '../pages/Staff/UpdateStaff';
import AllLoan from '../pages/LoanApproval/AllLoan';
import AllLoanDetails from '../pages/LoanApproval/ViewAllLoan/AllLoanDetails';
import PendingLoans from '../pages/LoanApproval/PendingLoans';
import PendingLoanDetails from '../pages/LoanApproval/ViewPending/PendingLoanDetails';
import ActiveLoan from '../pages/LoanApproval/ActiveLoan';
import LoanAdministration from '../pages/LoanApproval/LoanAdministration';
import LoanPurpose from '../pages/LoanManagement/LoanPurpose/LoanPurpose';
import CreateLoanPurpose from '../pages/LoanManagement/LoanPurpose/AddLoanPurpose';
import UpdateLoanPuropse from '../pages/LoanManagement/LoanPurpose/UpdateLoanPuropse';
import LoanRequirement from '../pages/LoanManagement/LoanRequirement/LoanRequirement';
import ViewLoanRequirementDetails from '../pages/LoanManagement/LoanRequirement/ViewLoanRequirement/ViewLoanRequirementDetails';
import EditLoanRequirement from '../pages/LoanManagement/LoanRequirement/EditLoanRequirement';
import CreateLoanRequirement from '../pages/LoanManagement/LoanRequirement/AddLoanRequirement';
import LoanTenure from '../pages/LoanManagement/LoanTenure/LoanTenure';
import CreateLonTenure from '../pages/LoanManagement/LoanTenure/AddLonTenure';
import EditLoanTenure from '../pages/LoanManagement/LoanTenure/EditLoanRequirement';
import HomeOwnership from '../pages/LoanManagement/HomeOwnership/HomeOwnership';
import CreateHomeOwnership from '../pages/LoanManagement/HomeOwnership/AddHomeOwnership';
import EditHomeOwnership from '../pages/LoanManagement/HomeOwnership/EditHomeOwnership';
import LoanProduct from '../pages/LoanManagement/LoanProduct/LoanProduct';
import ApprovalSetup from '../pages/LoanManagement/ApprovalSetup/ApprovalSetup';
import ViewApprovalItem from '../pages/LoanManagement/ApprovalSetup/ViewApprovalItem';
import CreateAprrovalItem from '../pages/LoanManagement/ApprovalSetup/AddAprrovalItem';
import EditApprovalSetup from '../pages/LoanManagement/ApprovalSetup/EditApprovalSetup';
import Customer from '../pages/Report/Customer';
import Transaction from '../pages/Report/Transaction';
import AllGroup from '../pages/Permission/Group/AllGroup';
import AssignGroupPermission from '../pages/Permission/Group/AssignPermissiontoGroup';
import UpdateGroup from '../pages/Permission/Group/UpdateGroup';
import CreateGroup from '../pages/Permission/Group/AddGroup';
import AllAssignStaff from '../pages/Permission/AssignStaff/AllAssignStaff';
import AssignGroup from '../pages/Permission/AssignStaff/AssignGroup';
import AssignPermStaff from '../pages/Permission/AssignStaff/AssignPermStaff';
import AllComplains from '../pages/Complains/AllComplains';
import ComplainId from '../pages/Complains/ComplainId';
import AllFixedDeposit from '../pages/FixedDeposit/AllFixedDeposit';
import UpdateDeposits from '../pages/FixedDeposit/UpdateDeposits';
import CreateFixedDeposit from '../pages/FixedDeposit/AddFixedDeposit';
import ViewFixedDeposit from '../pages/FixedDeposit/ViewFixedDeposit';
import RepeatedTransaction from '../pages/RepeatedTransaction/RepeatedTransaction';
import ApprovalRequest from '../pages/ApprovalRequest/ApprovalRequest';
import GetApprovalRequest from '../pages/ApprovalRequest/GetApprovalRequest';
import ChangePassword from '../pages/Settings/ChangePassword';
import SetSystem from '../pages/Settings/SetSystem';
import AllProperties from '../pages/LoanManagement/Property/AllProperties';
import GetPropertDetail from '../pages/LoanManagement/Property/GetPropertiesById/GetPropertDetail';
import UpdateProperty from '../pages/LoanManagement/Property/UpdateProperty';
import GetAllLoanTypes from '../pages/LoanManagement/LoanTypes/GetAllLoanTypes'; 
import CreateLoanType from '../pages/LoanManagement/LoanTypes/CreateLoanType';
import UpdateLoanType from '../pages/LoanManagement/LoanTypes/UpdateLoanType';
import IntraBank from '../pages/Report/IntraBank';
import Airtime from '../pages/Report/Airtime';
import Bill from '../pages/Report/Bill';
import Data from '../pages/Report/Data';
import Fixed from '../pages/Report/Fixed';
import LienAdministration from '../pages/LoanApproval/LienAdministration';
import AllLienApproval from '../pages/LoanManagement/Property/LienApproval/AllLienApprova;l';
import LienApprovalDetails from '../pages/LoanManagement/Property/LienApproval/ViewLienApproval/PendingLoanDetails';
import AllStock from '../pages/StocksManagement/AllStock';
import CreateStocks from '../pages/StocksManagement/CreateStocks';
import UpdateStock from '../pages/StocksManagement/UpdateStock';
import ViewStock from '../pages/StocksManagement/ViewStock';
import KycUnderReview from '../pages/customers/KycUnderReview';
import ApprovedLoans from '../pages/LoanApproval/ApprovedLoan';
import ViewPendingKycUnderReviewdetail from '../pages/customers/ViewKycUnderReview/ViewPendingKycdetail';
const RightSide = ({isOpen, tog}) => {
  
 
  return (
    <>
      
      <div className={ ` ml-0  w-full flex flex-col bg-[#f3f4f7] min-h-screen overflow-hidden   `}>
      <div className=' w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      {isOpen && <MobileSidebar isOpen={isOpen} tog={tog} />}
      </div>
      
      <div className='lg:py-3 px-6 p-2'>
       
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path="/ui/customer/customer-date" element={<AllCustomer/>}></Route>
            <Route path="/ui/customer/Veiw-all-customer/:id/*" element={<ViewCustomerdetails/>}></Route>
            <Route path="/ui/customer/all-customer" element={<ActiveCustomer/>}></Route>
            <Route path="/ui/customer/block-customers" element={<BlockCustomer/>}></Route>
            <Route path="/ui/customer/pending-kyc" element={<PendingKyc/>}></Route>
            <Route path="/ui/customer/pending-kyc/view/:id/*" element={<ViewPendingKycdetail/>}></Route>
            <Route path="/ui/staffs/CreateStaff" element={<CreateStaff/>}></Route>
            <Route path='/ui/staffs/AllStaff' element={<AllStaff/>}></Route>
            <Route path='/ui/staffs/UpdateStaff/:id' element={<UpdateStaff/>}></Route>
            <Route path='/ui/LoanApproval/GetAllLoans' element={<AllLoan/>}></Route>
            <Route path='/ui/LoanApproval/:id/details/*' element={<AllLoanDetails/>}></Route>
            <Route path='/ui/LoanApproval/pendingloans' element={<PendingLoans/>}></Route>
            <Route path='/ui/LoanApproval/pendingloans/:id/*' element={<PendingLoanDetails/>}></Route>
            <Route path='/ui/LoanApproval/activeloans'element={<ActiveLoan/>}></Route>
            <Route path='/ui/LoanApproval/loanAdminisration' element={<LoanAdministration/>}></Route>
            <Route path='/ui/LoanApproval/lien-Adminisration' element={<LienAdministration/>}></Route>
            <Route path='/ui/tables/loan-purpose' element={<LoanPurpose/>}></Route>
            <Route path='/ui/tables/Create-loan-purpose' element={<CreateLoanPurpose/>}></Route>
            <Route path='/ui/tables/edit-loan-purpose/:id' element={<UpdateLoanPuropse/>}></Route>
            <Route path='/ui/tables/loan-requirement' element={<LoanRequirement/>}></Route>
            <Route path="/ui/tables/loan-requirement/details/:id/*" element={<ViewLoanRequirementDetails/>}></Route>
            <Route path="/ui/tables/loan-requirement/edit/:id" element={<EditLoanRequirement/>}></Route>
            <Route path="/ui/tables/loan-requirement/CreateLoan" element={<CreateLoanRequirement/>}></Route>
            <Route path="/ui/tables/loantenure" element={<LoanTenure/>}></Route>
            <Route path="/ui/tables/Createloantenure" element={<CreateLonTenure/>}></Route>
            <Route path="/ui/tables/editloantenure/:id" element={<EditLoanTenure/>}></Route>
            <Route path="/ui/tables/homeownership" element={<HomeOwnership/>}></Route>
            <Route path='/ui/tables/Createhomeownership' element={<CreateHomeOwnership/>}></Route>
            <Route path='/ui/tables/edithomeownership/:id' element={<EditHomeOwnership/>}></Route>
            <Route path='/ui/tables/loan-product' element={<LoanProduct/>}></Route>
            <Route path='/ui/tables/approval' element={<ApprovalSetup/>}></Route>
            <Route path='/ui/tables/approval/details/:id' element={<ViewApprovalItem/>}></Route>
            <Route path='/ui/tables/Createapproval' element={<CreateAprrovalItem/>}></Route>
            <Route path='/ui/tables/editapproval/:id' element={<EditApprovalSetup/>}></Route>
            <Route path='/ui/report/getCustomer' element={<Customer/>}></Route>
            <Route path='/ui/report/Transaction' element={<Transaction/>}></Route>
            <Route path='/ui/report/Transaction/Intrabank' element={<IntraBank/>}></Route>
            <Route path='/ui/report/Transaction/airtime' element={<Airtime/>}></Route>
            <Route path='/ui/report/Transaction/bills' element={<Bill/>}></Route>
            <Route path='/ui/report/Transaction/data' element={<Data/>}></Route>
            <Route path='/ui/report/Transaction/fixed' element={<Fixed/>}></Route>
            <Route path="/ui/permission/allgroup" element={<AllGroup/>}></Route>
            <Route path="/ui/permission/assign-permission-group/:id" element={<AssignGroupPermission/>}></Route>
            <Route path="/ui/permission/updategroup/:id" element={<UpdateGroup/>}></Route>
            <Route path='/ui/permission/Creategroup' element={<CreateGroup/>}></Route>
            <Route path="/ui/permission/alluser" element={<AllAssignStaff/>}></Route>
            <Route path="/ui/permission/assign-group/:id" element={<AssignGroup/>}></Route>
            <Route path="/ui/permission/assign-permission/:id" element={<AssignPermStaff/>}></Route>
            <Route path="/ui/complaint/" element={<AllComplains/>}></Route>
            <Route path="/ui/complaints/:id" element={<ComplainId/>}></Route>
            <Route path="/ui/fixed-deposit/Allfixed" element={<AllFixedDeposit/>}></Route>
            <Route path="/ui/fixed-deposit/updateFixed/:id" element={<UpdateDeposits/>}></Route>
            <Route path="/ui/fixed-deposit/createnewfixed" element={<CreateFixedDeposit/>}></Route>
            <Route path="/ui/fixed-deposit/viewFixed/:id" element={<ViewFixedDeposit/>}></Route>
            <Route path='/ui/risk-management/' element={<RepeatedTransaction/>}></Route>
            <Route path="/ui/approvalRequest" element={<ApprovalRequest/>}></Route>
            <Route path="/ui/getapprovalrequest/:id" element={<GetApprovalRequest/>}></Route>
            <Route path="/ui/system/changepassword" element={<ChangePassword/>}></Route>
            <Route path="/ui/system/setsystem" element={<SetSystem/>}></Route>
            <Route path="/ui/tables/property/" element={<AllProperties/>}></Route>
            <Route path="/ui/tables/property/:id/*" element={<GetPropertDetail/>}></Route>
            <Route path="/ui/tables/updateProperty/:id" element={<UpdateProperty/>}></Route>
            <Route path="/ui/tables/loantype" element={<GetAllLoanTypes/>}></Route>
            <Route path="/ui/tables/createLoanType" element={<CreateLoanType/>}></Route>
            <Route path="/ui/tables/updateloanType/:id" element={<UpdateLoanType/>}></Route>
            <Route path="/ui/tables/approveLien" element={<AllLienApproval/>}></Route>
            <Route path= "/ui/tables/viewapprovelien/:id" element={<LienApprovalDetails/>}></Route>
            <Route path="/ui/tables/stocks/" element={<AllStock/>}></Route>
            <Route path="/ui/tables/create-stocks/" element={<CreateStocks/>}></Route>
            <Route path="/ui/tables/stocks/:id/" element={<UpdateStock/>}></Route>
            <Route path="/ui/tables/View-stocks/:id/" element={<ViewStock/>}></Route>
            <Route path="/ui/customer/kyc-under-review" element={<KycUnderReview/>}></Route>
            <Route path= "/ui/customer/kyc-under-review/view/:id/*" element={<ViewPendingKycUnderReviewdetail/>}></Route>
            <Route path="/ui/LoanApproval/approvedloans" element={<ApprovedLoans/>}></Route>
          </Routes>
     
        
      </div>
    </div>
    </>
  
  )
}

export default RightSide