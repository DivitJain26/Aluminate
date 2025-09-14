// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Landing from '../pages/Landing'; //Added by Arya 
import SearchPage from '../pages/SearchPage';  //Added by Arya
import Dashboard from '../pages/Dashboard'; //Added by Arya
import RootLayout from '../components/layout/RootLayout'; // Corrected import path 
import ProfilePage from '../pages/ProfilePage';

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <RootLayout />,
                children: [
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "search", element: <SearchPage /> },
                    { path: "/profile", element: <ProfilePage /> },
                ],
            },
        ]
    },
    {
        element: <PublicRoute />,
        children: [
            { path: "/", element: <Landing /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ]
    },
]);