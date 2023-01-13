import React from 'react';

const Login = React.lazy(() => import('../modules/login/Login'));
const Signup = React.lazy(() => import('../modules/signup/Signup'));
const Dashboard =  React.lazy(() => import('../modules/dashboard/Dashboard'));
const Wallet =  React.lazy(() => import('../modules/wallet/Wallet'));
const MarketPlace =  React.lazy(() => import('../modules/marketplace/MarketPlace'));
const AssetHistory =  React.lazy(() => import('../modules/assethistory/AssetHistory'));
const YourAsset = React.lazy(()=>import('../modules/YourAsset/YourAsset'));



const routes = [
    {
        id: 0,
        path: '/',
        exact: true,
        component: Login
    },
    {
        id: 1,
        path: '/signup',
        exact: true,
        component: Signup
    },
    {
        id: 2,
        path: '/dashboard',
        exact: true,
        component: Dashboard
    },
    {
        id: 3,
        path: '/marketplace',
        exact: true,
        component: MarketPlace
    },
    {
        id: 4,
        path: '/marketplace/:userId',
        exact: true,
        component: MarketPlace
    },
    {
        id: 4,
        path: '/wallet',
        exact: true,
        component: Wallet
    },
    {
        id: 5,
        path: '/asset-history',
        exact: true,
        component: AssetHistory
    },
    {
        id: 6,
        path: '/assets',
        exact: true,
        component: YourAsset
    }
];

export default routes;


