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
        path: '/live/:id',
        component: lazy(() => import('@pages/Live/Live'))
    }
]