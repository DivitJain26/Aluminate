import { createContext } from 'react';

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    login: async () => { },
    register: async () => { },
    logout: () => { },
    updateProfile: async () => { },
    changePassword: async () => { },
    clearError: () => { },
    isAdmin: null,
    isAlumni: null,
    isStudent: null,
});