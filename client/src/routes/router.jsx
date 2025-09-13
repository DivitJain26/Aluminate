// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AlumniDirectoryUI from '../pages/AlumniDirectory';


export const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    {path: "/aldir", element: <AlumniDirectoryUI />},
    { path: "*", element: <Register /> },
]);
