import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export default [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to="/home" />
    },
    {
        path: '/home',
        component: lazy(() => import('@pages/Home/Home'))
    },
    {
        path: '/live',
        component: lazy(() => import('@pages/Live/Live')),
        routes: [
            {
                path: '/live/:id',
                component: lazy(() => import('@pages/Live/Content'))
            }
        ]
    },
    {
        path: '/video',
        component: lazy(() => import('@pages/Video/VideoHome')),
        exact: true
    },
    {
        path: '/article/:id',
        component: lazy(() => import('@pages/Article/Article'))
    }
]