import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 12000,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Clear token on 401
client.interceptors.response.user(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
        return Promise.reject(error);
    }
);

export default client;