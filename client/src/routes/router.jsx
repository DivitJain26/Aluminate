// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';


export const router = createBrowserRouter([
    // {
    //     element: <RootLayout />,
    //     children: [
    //         { path: "/", element: <Landing /> },
    //         { path: "/dashboard", element: (<ProtectedRoute> <Dashboard /> </ProtectedRoute>)},
    //     ],
    // },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Register /> },
]);