import { useEffect, useState } from 'react';
import { authAPI } from '../utils/api.js';
import { AuthContext } from './AuthContext.jsx';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in by verifying with the server
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);

                // Verify token is still valid via API call
                authAPI.getProfile()
                    .then(response => {
                        if (response.data.success) {
                            const updatedUser = response.data.data.user;
                            setUser(updatedUser);
                            setIsAuthenticated(true);
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                        }
                    })
                    .catch(() => {
                        // Token is invalid, clear storage
                        localStorage.removeItem('user');
                        setUser(null);
                        setIsAuthenticated(false);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authAPI.login(credentials);

            if (response.data.success) {
                const userData = response.data.data.user;

                // Save only user data to localStorage (token is in HTTP-only cookie)
                localStorage.setItem('user', JSON.stringify(userData));

                // Update state
                setUser(userData);
                setIsAuthenticated(true);

                return response.data;
            }

            throw new Error(response.data.message || 'Login failed');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authAPI.register(userData);

            if (response.data.success) {
                const newUser = response.data.data.user;

                // Save only user data to localStorage (token is in HTTP-only cookie)
                localStorage.setItem('user', JSON.stringify(newUser));

                // Update state
                setUser(newUser);
                setIsAuthenticated(true);

                return response.data;
            }

            throw new Error(response.data.message || 'Registration failed');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Call backend logout endpoint to clear cookies
            await authAPI.logout();

            // Clear localStorage
            localStorage.removeItem('user');

            // Update state
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error signing out:', error);
            const message = error.response?.data?.message || error.message || 'Logout failed';
            setError(message);

            // Even if API call fails, clear client-side state
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);

            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (updates) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authAPI.updateProfile(updates);

            if (response.data.success) {
                const updatedUser = response.data.data.user;

                // Update localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log('User profile updated:', updatedUser);
                // Update state
                setUser(updatedUser);

                return updatedUser;
            }

            throw new Error(response.data.message || 'Profile update failed');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Profile update failed';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authAPI.changePassword({
                currentPassword,
                newPassword
            });

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data.message || 'Password change failed');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Password change failed';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    const hasRole = (role) => user?.role === role;
    const isAdmin = () => hasRole("admin");
    const isAlumni = () => hasRole("alumni");
    const isStudent = () => hasRole("student");

    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        clearError,
        isAdmin,
        isAlumni,
        isStudent,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);