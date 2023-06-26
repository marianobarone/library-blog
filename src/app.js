import React from 'react';
import { AuthProvider } from './global/context/AuthContext';
import { RouterProvider } from 'react-router-dom'
import { router } from './components/routes/MainRouter.js';

export default function App() {
    return (
        <React.StrictMode>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </React.StrictMode>
    )
}
