import React, { lazy } from 'react';

// const Index = lazy(() => import('../pages/Index'));

// const Clients = lazy(() => import('../pages/Clients'));
const ParentList = lazy(() => import('../pages/Dashboard/ParentList'));
const AllServices = lazy(() => import('../pages/Dashboard/AllServices'));
const ParentServices = lazy(() => import('../pages/Dashboard/ParentServices'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <ParentList />,
        layout: 'default',
        roles: ['user']
    },
   
    
    {
        path:"/all-services",
        element: <AllServices />,
        layout: 'default',
        roles: ['user']

    },

    {
        path: '/parents/:parentId/services',
        element: <ParentServices />,
        layout: 'default',
        roles: ['user']
    }
  
   

];

export { routes };
