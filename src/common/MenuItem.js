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
      key: 'Loan',
      label: 'Loan',
      isTitle: true,
      children: [
        {
          key: 'loan-approval',
          label: 'Loan Approval',
          isTitle: false,
          icon: FileText,
          children: [
            {
              key: 'all-loans',
              label: 'All Loans',
              url: '/ui/LoanApproval/GetAllLoans',
            },
            {
              key: 'pending-loans',
              label: 'Pending Loans',
              url: '/ui/LoanApproval/pendingloans',
            },
            {
              key: 'active-loans',
              label: 'Active Loans',
              url: '/ui/LoanApproval/activeloans',
            },
            {
              key: 'loan-administration',
              label: 'Loan Administration',
              url: '/ui/LoanApproval/loanAdminisration',
            },
          ],
        },
        {
          key: 'Loan-management',
          label: 'Loan Management',
          isTitle: false,
          icon: Grid,
          children: [
            {
              key: 'loan-purpose',
              label: 'Loan Purpose',
              url: '/ui/tables/loan-purpose',
            },
            {
              key: 'loan-requirement',
              label: 'Loan Requirement Setup',
              url: '/ui/tables/loan-requirement',
            },
            {
              key: 'loan-tenure',
              label: 'Loan Tenure',
              url: '/ui/tables/loantenure',
            },
            {
              key: 'home-ownership',
              label: 'Home Ownership',
              url: '/ui/tables/homeownership',
            },
            {
              key: 'loan-products',
              label: 'Loan Products',
              url: '/ui/tables/loan-product',
            },
            {
              key: 'approval-item-setup',
              label: 'Approval Item Setup',
              url: '/ui/tables/approval',
            },
          ],
        },
      ],
    },
    {
      key: 'Account',
      label: 'Account',
      isTitle: true,
      children: [
        {
          key: 'customer-management',
          label: 'Customer',
          isTitle: false,
          icon: File,
          children: [
            {
              key: 'all-customers',
              label: 'All Customers',
              url: '/ui/customer/customer-date',
            },
            {
              key: 'active-customers',
              label: 'Active Customers',
              url: '/ui/customer/all-customer',
            },
            {
              key: 'blocked-customers',
              label: 'Blocked Customers',
              url: '/ui/customer/block-customers',
            },
            {
              key: 'pending-kyc',
              label: 'Pending KYC',
              url: '/ui/customer/pending-kyc',
            },
          ],
        },
        {
          key: 'Staff',
          label: 'Staff',
          isTitle: false,
          icon: Bookmark,
          url: '/ui/staffs/AllStaff',
        },
      
      ],
    },
    
    {
      key: 'Management',
      label: 'Management',
      isTitle: true,
      children: [
      
        {
          key: 'fixed-deposit',
          label: 'Fixed Deposit Setup',
          isTitle: false,
          icon: Archive,
          url: '/ui/fixed-deposit/Allfixed',
          
        },
        // {
        //   key: 'maker-checker',
        //   label: 'Maker & Checker',
        //   isTitle: false,
        //   icon: Anchor,
        //   children: [
        //     {
        //       key: 'approval-request',
        //       label: 'Approval Request',
        //       url: '/ui/system/approvalrequest',
        //     },
        //   ],
        // },
        {
          key: 'approval-request',
          label: 'Approval Request',
          isTitle: false,
          icon: Anchor,
          url: '/ui/fixed-deposit/Allfixed',
          
        },
        {
          key: 'risk-management',
          label: 'Risk Management',
          isTitle: false,
          icon: Wrench,
          children: [
            {
              key: 'repeated-transaction',
              label: 'Repeated Transaction',
              url: '/ui/risk-management/',
            },
          ],
        },
        {
          key: 'reports',
          label: 'Reports',
          isTitle: false,
          icon: File,
          children: [
            {
              key: 'customer-report',
              label: 'Customer',
              url: '/ui/report/getCustomer',
            },
            {
              key: 'transaction-report',
              label: 'Transaction',
              url: '/ui/report/Transaction',
            },
          ],
        },
      
        {
          key: 'Customer complaints',
          label: 'Customer Complaints',
          isTitle: false,
          icon: MessageSquare,
          url: '/ui/complaint/',
        },
      ],
    },
    {
      key: 'Settings',
      label: 'Settings',
      isTitle: true,
      children: [
        {
          key: 'permission-management',
          label: 'Permission',
          isTitle: false,
          icon: LockIcon,
          children: [
            {
              key: 'add-group',
              label: 'Add Group',
              url: '/ui/permission/Addgroup',
            },
            {
              key: 'assign-staff',
              label: 'Assign Staff',
              url: '/ui/permission/alluser',
            },
            {
              key: 'all-groups',
              label: 'All Groups',
              url: '/ui/permission/allgroup',
            },
          ],
        },
        {
          key: 'system-settings',
          label: 'System Settings',
          isTitle: false,
          icon: Settings,
          children: [
            {
              key: 'system-configuration',
              label: 'System Configuration',
              url: '/ui/system/setsystem',
            },
            {
              key: 'change-password',
              label: 'Change Password',
              url: '/ui/system/changepassword',
            },
          ],
        },
      ],
    },
  ];
  
  export { MENU_ITEMS }