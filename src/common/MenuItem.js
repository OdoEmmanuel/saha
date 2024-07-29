import {
    BarChart2,
    Bookmark,
    Briefcase,
    Calendar,
    Clipboard,
    Cpu,
    FilePlus,
    FileText,
    Gift,
    Grid,
    Home,
    Lock,
    Mail,
    Map,
    MessageSquare,
    Package,
    Share2,
    Settings,
    BookAIcon,
    File,
    LockIcon,
    Wrench,
    Archive,
    Anchor
  } from 'lucide-react'


  const MENU_ITEMS = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      isTitle: false,
      icon: Home,
      url: '/',
    },
    {
      key: 'customer-management',
      label: 'Customer management',
      isTitle: false,
      icon: File,
      url: '/customer',
  
      children: [
        {
          key: 'all-customer',
          label: 'All Customers',
          url: '/ui/customer/customer-date',
          parentKey: 'dashboard',
        },
        {
          key: 'all-customer',
          label: 'Active Customer',
          url: '/ui/customer/all-customer',
          parentKey: 'dashboard',
        },
  
       
        {
          key: 'blocked-customers',
          label: 'Blocked Customers',
          url: '/ui/customer/block-customers',
          parentKey: 'dashboard',
        },
        {
          key: 'blocked-customers',
          label: 'Pending kyc',
          url: '/ui/customer/pending-kyc',
          parentKey: 'dashboard',
        },
      ],
    },
  
    {
      key: 'forms',
      label: 'Staff Management',
      isTitle: false,
      icon: Bookmark,
      children: [
        {
          key: 'forms-basic-elements',
          label: 'Add Staff',
          url: '/ui/staffs/AddStaff',
          parentKey: 'forms',
        },
        {
          key: 'forms-loan-elements',
          label: 'All Staff',
          url: '/ui/staffs/AllStaff',
          parentKey: 'forms',
        },
  
      ],
    },
  
  
    {
      key: 'norms',
      label: 'Loan Approval',
      isTitle: false,
      icon: FileText,
      children: [
        {
          key: 'All Loans',
          label: 'All Loans',
          url: '/ui/LoanApproval/GetAllLoans',
          parentKey: 'forms',
        },
        {
          key: 'Get Pending Loans',
          label: 'Pending Loans',
          url: '/ui/LoanApproval/pendingloans',
          parentKey: 'forms',
        },
        {
          key: 'Active Loans',
          label: 'Active Loans',
          url: '/ui/LoanApproval/activeloans',
          parentKey: 'forms',
        },
  
        {
          key: 'Loan Adminisration',
          label: 'Loan Administration',
          url: '/ui/LoanApproval/loanAdminisration',
          parentKey: 'forms',
        },
  
        // ...(userType === 'SuperAdmin'|| userType ==='Admin'  ? [{
        //   key: 'Loan Administration',
        //   label: 'Loan Administration',
        //   url: '/ui/LoanApproval/loanAdminisration',
        //   parentKey: 'forms',
        // }] : []),
  
      ],
    },
  
    {
      key: 'tables',
      label: 'Loan management',
      isTitle: false,
      icon: Grid,
      children: [
  
        {
          key: 'tables-loan-purpose',
          label: 'Loan Purpose',
          url: '/ui/tables/loan-purpose',
          parentKey: 'tables',
        },
  
        {
          key: 'tables-loan-requirement',
          label: 'Loan Requirement Setup',
          url: '/ui/tables/loan-requirement',
          parentKey: 'tables',
        },
  
        {
          key: 'tables-loan-tenure',
          label: 'Loan Tenure',
          url: '/ui/tables/loantenure',
          parentKey: 'tables',
        },
  
        {
          key: 'tables-home-ownership',
          label: 'Home Ownership',
          url: '/ui/tables/homeownership',
          parentKey: 'tables',
        },
  
        {
          key: 'tables-loan',
          label: 'Loan Products',
          url: '/ui/tables/loan-product',
          parentKey: 'tables',
        },
        {
          key: 'tables-loan',
          label: 'Approval Item Setup',
          url: '/ui/tables/approval',
          parentKey: 'tables',
        },
   
      ],
    },
    {
      key: 'maps',
      label: 'Report',
      isTitle: false,
      icon: File,
      children: [
        {
          key: 'report',
          label: 'Customer',
          url: '/ui/report/getCustomer',
          parentKey: 'maps',
        },
  
        {
          key: 'report',
          label: 'Transaction',
          url: '/ui/report/Transaction',
          parentKey: 'maps',
        },
      ],
    },
    {
      key: 'demo',
      label: 'Permission Management',
      isTitle: false,
      icon: LockIcon,
      children: [
        {
          key: 'Add Group',
          label: 'Add Group',
          url: '/ui/permission/Addgroup',
          parentKey: 'Group',
        },
        {
          key: 'all-user',
          label: 'Assign Staff',
          url: '/ui/permission/alluser',
          parentKey: 'Group',
        },
  
        {
          key: 'all-group',
          label: 'All Group',
          url: '/ui/permission/allgroup',
          parentKey: 'Group',
        },
        // {
        //   key: 'demo-2',
        //   label: 'Item 2',
        //   badge: {
        //     text: 'New',
        //     variant: 'bg-info',
        //   },
        //   url: '/item2',
        //   parentKey: 'demo',
        // },
      ],
    },
    {
      key: 'customer-complains',
      label: 'Customer Complains',
      isTitle: false,
      icon: MessageSquare,
      children: [
        {
          key: 'complains',
          label: 'All Complains',
          url: '/ui/complaint/',
          parentKey: 'customer complains',
        },
        // {
        //   key: "email-read",
        //   label: "Read Email",
        //   url: "/apps/email/read",
        //   parentKey: "apps-email",
        // },
        // {
        //   key: "email-compose",
        //   label: "Compose Email",
        //   url: "/apps/email/compose",
        //   parentKey: "apps-email",
        // },
      ],
    },
  
    {
      key: 'Fixed Deposit',
      label: 'Fixed Deposit Setup',
      isTitle: false,
      icon: Archive,
     
  
      children: [
        {
          key: 'Fixed Deposit',
          label: 'All Fixed Deposit',
          url: '/ui/fixed-deposit/Allfixed',
          parentKey: 'dashboard'
        }
  
        // {
        //   key: 'all-customer',
        //   label: 'Customer',
        //   url: '/ui/customer/customer-date',
        //   parentKey: 'dashboard',
        // },
        
        
      ],
    },
  
  
    {
      key: 'Maker & Checker',
      label: 'Maker & Checker',
      isTitle: false,
      icon: Anchor,
     
  
      children: [
        {
          key: 'Approval Request',
          label: 'Approval Request',
          url: '/ui/system/approvalrequest',
          parentKey: 'dashboard'
        }
  
        // {
        //   key: 'all-customer',
        //   label: 'Customer',
        //   url: '/ui/customer/customer-date',
        //   parentKey: 'dashboard',
        // },
        
        
      ],
    },
  
    {
      key: 'Risk Management',
      label: 'Risk Management',
      isTitle: false,
      icon: Wrench,
     
  
      children: [
        {
          key: 'Repeated Transaction',
          label: 'Repeated Transaction',
          url: '/ui/risk-management/',
          parentKey: 'dashboard',
        },
  
        // {
        //   key: 'all-customer',
        //   label: 'Customer',
        //   url: '/ui/customer/customer-date',
        //   parentKey: 'dashboard',
        // },
        
        
      ],
    },
  
    {
      key: 'system-setting',
      label: 'System setting',
      isTitle: false,
      icon: Settings,
      children: [
  
        {
          key: 'setSystem',
          label: 'System Configuration',
          url: '/ui/system/setsystem',
          parentKey: 'dashboard',
        },
  
        // {
        //   key: 'all-System',
        //   label: 'Settings',
        //   url: '/ui/system/settings',
        //   parentKey: 'dashboard',
        // },
  
        {
          key: 'Change-Password',
          label: 'Change Password',
          url: '/ui/system/changepassword',
          parentKey: 'dashboard',
        },
       
      ],
    },
  ]
  
  export { MENU_ITEMS }