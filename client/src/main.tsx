import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Theme from './themeProvider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './screens/Home.tsx'
import { Insert } from './screens/Insert.tsx'
import { Update } from './screens/Update.tsx'
import { Error404 } from './screens/ErrorPage.tsx'

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
        <Theme>
            <RouterProvider router={router}></RouterProvider>
        </Theme>
    </React.StrictMode>
)
