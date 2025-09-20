import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'}/api`,
    withCredentials: true, // Important for cookies
});


// Intercept responses
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If access token expired and this is not a refresh request already
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                await api.post('/auth/refresh', {}, { withCredentials: true });
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // console.error('Refresh token failed', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (updates) => api.put('/auth/updateProfile', updates),
};

// Users API
export const usersAPI = {
    getUser: (filters = {}) => {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) params.append(key, filters[key]);
        });
        return api.get(`/users/profiles?${params}`);
    },

    getUserById: (id) => api.get(`/users/profiles/${id}`),

    // getStats: () => api.get('/users/stats/overview'),

    // getAllUsers: (filters = {}) => {
    //     const params = new URLSearchParams();
    //     Object.keys(filters).forEach(key => {
    //         if (filters[key]) params.append(key, filters[key]);
    //     });
    //     return api.get(`/users/admin/all?${params}`);
    // },

    // updateUserRole: (id, role) => api.put(`/users/${id}/role`, { role }),

    // updateUserStatus: (id, isActive) => api.put(`/users/${id}/status`, { isActive }),
};

// Admin API
export const adminAPI = {
    downloadData: () => api.get('/admin/download', {
        responseType: "blob", // ensures Excel comes as binary
    })
}

export default api;