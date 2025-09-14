// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Landing from '../pages/Landing'; //Added by Arya 
import SearchPage from '../pages/SearchPage'; '../pages/SearchPage'; //Added by Arya
import Dashboard from '../pages/Dashboard'; //Added by Arya
import RootLayout from '../layout/RootLayout';

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
        { path: "", element: <Dashboard /> },          
        { path: "dashboard", element: <Dashboard /> },      
        { path: "search", element: <SearchPage /> },    
        ],
    },
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
]);