import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

api.interceptors.request.use((config) => {
        const authToken = localStorage.getItem('access');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`
        }

        return config;
    }, (error => Promise.reject(error))
);

export default api;