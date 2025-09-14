import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner/>; // Or a spinner
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;