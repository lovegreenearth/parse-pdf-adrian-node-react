import React from 'react';
import loadable from '@loadable/component';
import Loading from '../components/ui/Loading';

const routes = [
    {
        path: '/',
        key: 'ROOT',
        layout: 'Layout2', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Home'), {
            fallback: <Loading />
        })
    },
    {
        path: '/signup',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('./../pages/Signup'), {
            fallback: <Loading />
        })
    },
    {
        path: '/signin',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('./../pages/Signin'), {
            fallback: <Loading />
        })
    },
    {
        path: '/read/:id',
        key: 'ROOT',
        layout: 'Layout3', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Read'), {
            fallback: <Loading />
        })
    },
];

export default routes;
