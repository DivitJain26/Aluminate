import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
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
                await axios.post('/auth/refresh', {}, { withCredentials: true });
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
    updateProfile: (updates) => api.put('/auth/profile', updates),
};

export default api;