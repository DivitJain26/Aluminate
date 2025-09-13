// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Landing from '../pages/Landing'; //Added by Arya 

export const router = createBrowserRouter([
    // {
    //     element: <RootLayout />,
    //     children: [
    //         { path: "/", element: <Landing /> },
    //         { path: "/dashboard", element: (<ProtectedRoute> <Dashboard /> </ProtectedRoute>)},
    //     ],
    // },
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
]);