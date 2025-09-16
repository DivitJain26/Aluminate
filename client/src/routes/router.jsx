// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import LandingPage from '../pages/LandingPage.jsx'; //Added by Arya 
import SearchPage from '../pages/SearchPage.jsx';  //Added by Arya
import DashboardPage from '../pages/DashboardPage.jsx'; //Added by Arya
import RootLayout from '../components/layout/RootLayout'; // Corrected import path 
import ProfilePage from '../pages/profile/MyProfilePage.jsx';
import EditProfilePage from '../pages/profile/EditProfilePage.jsx';
import ViewProfilePage from '../pages/profile/ViewProfilePage.jsx';

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <RootLayout />,
                children: [
                    { path: "/dashboard", element: <DashboardPage /> },
                    { path: "/search", element: <SearchPage /> },
                    { path: "/my-profile", element: <ProfilePage /> },
                    { path: "/edit-profile", element: <EditProfilePage /> },
                    { path: "/view-profile/:id", element: <ViewProfilePage />}
                ],
            },
        ]
    },
    {
        element: <PublicRoute />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
        ]
    },
]);