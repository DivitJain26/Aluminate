// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import AlumniDirectoryUI from "../pages/AlumniDirectory";
import ProtectedRoute from "../pages/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/aldir",
    element: (
      <ProtectedRoute>
        <AlumniDirectoryUI />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Register /> },
]);
