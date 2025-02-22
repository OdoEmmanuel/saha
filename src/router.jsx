import { Route } from 'react-router-dom'
const HomePage = React.lazy(() => import('./pages/HomePage'))


export const uiRoutes = {
    path: '/',
    name: 'UI Elements',
    icon: 'pocket',
    header: 'UI Elements',
    children: [
        {
           path:'/',
           name:'dashboard'
        },

        {
            path: '/ui/staffs',
            name: 'staffs',
            children: [
              {
                path: '/ui/staffs/CreateStaff',
                name: 'Staff Form',
                element: <CreateSTAFF />,
                route: PrivateRoute,
              },
              {
                path: '/ui/staffs/AllStaff',
                name: 'Staff Table',
                element: <ALLSTAFF />,
                route: PrivateRoute,
              },
              {
                path: '/ui/staffs/UpdateStaff/:id',
                name: 'Staff Update',
                element: <UPDATESTAFF />,
                route: PrivateRoute,
              },
            ],
          },
    ]

}