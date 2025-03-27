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
    Anchor,
    User,
    ContactRound,
    AlignEndHorizontal
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
          key: 'Staff',
          label: 'Staff Management',
          isTitle: false,
          icon: ContactRound,
          // url: '/ui/staffs/AllStaff',
          children:[
            {
              key: 'All Staff',
              label: 'All Staff',
              url: '/ui/staffs/AllStaff',
            },
            {
              key:'Create Staff',
              label:' Create Staff',
              url: '/ui/staffs/CreateStaff'
            }
          ]
        },
        {
          key: 'customer-management',
          label: 'Customer Management',
          isTitle: false,
          icon: User,
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
              label: 'Loan Requirement',
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
              key:'loan-type',
              label:'Loan Type',
              url: '/ui/tables/loantype'
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
     
      ],
    },
    {
      key: 'Account',
      label: 'Account',
      isTitle: true,
      children: [
       
       
      
      ],
    },
    
    {
      key: 'Management',
      label: 'Management',
      isTitle: true,
      children: [
      
        {
          key: 'fixed-deposit',
          label: 'Investment',
          isTitle: false,
          icon: Archive,
          url: '/ui/fixed-deposit/Allfixed',
          children:[
            {
              key: 'Fixed deposit setup',
              label: 'Fixed deposit setup',
              url: '/ui/fixed-deposit/createnewfixed',
            },
            {
              key: ' All Fixed deposit ',
              label: 'All Fixed deposit ',
              url: '/ui/fixed-deposit/Allfixed',
            }
          ]
          
        },

        {
          key: 'reports',
          label: 'Reports',
          isTitle: false,
          icon: File,
          children: [
            {
              key: 'customer-report',
              label: 'Customer Accounts',
              url: '/ui/report/getCustomer',
            },
            {
              key: 'transaction-report',
              label: 'Inter Bank',
              url: '/ui/report/Transaction',
            },
            {
              key: 'transaction-report',
              label: 'Intra Bank',
              url: '/ui/report/Transaction/Intrabank',
            },
            {
              key: 'transaction-report',
              label: 'Airtime Purchase',
              url: '/ui/report/Transaction/airtime',
            },
            {
              key: 'transaction-report',
              label: 'Bill Payment',
              url: '/ui/report/Transaction/bills',
            },
            {
              key: 'transaction-report',
              label: 'Data Purchase',
              url: '/ui/report/Transaction/data',
            },
            {
              key: 'transaction-report',
              label: 'Fixed Deposit',
              url: '/ui/report/Transaction/fixed',
            },
          ],
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
          key:'property',
          label:'Properties',
     
          isTitle:false,
          icon:Briefcase,
          children: [
            {
              key: 'All Properties',
              label: 'All Properties',
              url: '/ui/tables/property',
            },
            {
              key: 'lien-administration',
              label: 'Lien Administration',
              url: '/ui/LoanApproval/lien-Adminisration',
            },
            {
              key: 'lien-administration',
              label: 'Lien Approval Setup',
              url: '/ui/tables/approveLien',
            },

           
          ],
        },

        {
          key:'stocks',
          label:'Stocks Management',
          isTitle:false,
          icon:AlignEndHorizontal,
          
      
      
      
        children: [
          {
            key: 'Allstocks',
            label: 'All Stocks',
            url: '/ui/tables/stocks',
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
        // {
        //   key: 'approval-request',
        //   label: 'Approval Request',
        //   isTitle: false,
        //   icon: Anchor,
        //   url: '/ui/approvalRequest',
          
        // },
      
        
      
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
              key: 'all-groups',
              label: 'All Groups',
              url: '/ui/permission/allgroup',
            },
            {
              key: 'Create-groups',
              label: 'Create Groups',
              url: '/ui/permission/Creategroup',
            },
            {
              key: 'assign-staff',
              label: 'Assign Staff',
              url: '/ui/permission/alluser',
            },
            {
              key: 'approval-request',
              label: 'Maker & Checker',
              // isTitle: false,
              // icon: Anchor,
              url: '/ui/approvalRequest',
              
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
              key: 'change-password',
              label: 'Change Password',
              url: '/ui/system/changepassword',
            },
            {
              key: 'system-configuration',
              label: 'System Configuration',
              url: '/ui/system/setsystem',
            },
          
          ],
        },
      ],
    },
  ];
  
  export { MENU_ITEMS }