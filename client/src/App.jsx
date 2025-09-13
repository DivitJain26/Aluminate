import React from 'react'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';

function App() {

    return (
        <>
            <RouterProvider router={router} />
    
        </>
    )
}

export default App
