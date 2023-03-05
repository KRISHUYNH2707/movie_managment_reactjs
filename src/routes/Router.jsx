import AdminGuard from 'guards/AdminGuard'
import Login from 'pages/login/Login'
import MovieForm from 'pages/movie-form/MovieForm'
import MovieManagement from 'pages/movie-management/MovieManagement'
import SignUp from 'pages/signup/SignUp'
import React, { Children } from 'react'
import { useRoutes } from 'react-router-dom'
import { AdminLayout } from '../layouts/admin/AdminLayout'

export default function Router() {
    const routing = useRoutes(
        [
            {
                path: '/admin',
                element: <AdminLayout/>,
                children: [
                    {path: '/admin',
                    element: <AdminGuard/>,
                    children:[
                        {
                            path: '/admin/movie-management',
                            element: <MovieManagement/>
                        }, 
                        {
                            path: '/admin/movie-management/edit/:id',
                            element: <MovieForm/>
                        },
                        {
                            path: '/admin/movie-management/add',
                            element: <MovieForm/>
                        },
                    ]},
                ]
            }, 
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/admin-sign-up',
                element: <SignUp/>
            }
        ]
    )
    return routing
}
