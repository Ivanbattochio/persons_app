import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './routes/Home.tsx'
import { Insert } from './routes/Insert.tsx'
import { Update } from './routes/Update.tsx'
import { Error404 } from './routes/ErrorPage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        errorElement: <Error404></Error404>,
    },
    {
        path: '/insert',
        element: <Insert></Insert>,
    },
    {
        path: '/update',
        element: <Update></Update>,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)
