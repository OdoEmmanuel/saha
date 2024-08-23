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




const RightSide = ({isOpen, tog}) => {
  
  console.log(isOpen)
  return (
    <>
      
      <div className={ `lg:ml-[16rem]  ml-0  w-full flex flex-col bg-[#f3f4f7] min-h-screen overflow-hidden   `}>
      <div className=' w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      {isOpen && <MobileSidebar isOpen={isOpen} tog={tog} />}
      </div>
      
      <div className='lg:p-6 p-2'>
       
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path="/ui/customer/customer-date" element={<AllCustomer/>}></Route>
            <Route path="/ui/customer/Veiw-all-customer/:id/*" element={<ViewCustomerdetails/>}></Route>
            <Route path="/ui/customer/all-customer" element={<ActiveCustomer/>}></Route>
            <Route path="/ui/customer/block-customers" element={<BlockCustomer/>}></Route>
            <Route path="/ui/customer/pending-kyc" element={<PendingKyc/>}></Route>
            <Route path="ui/customer/pending-kyc/view/:id/*" element={<ViewPendingKycdetail/>}></Route>
          </Routes>
     
        
      </div>
    </div></>
  
  )
}

export default RightSide