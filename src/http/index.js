import axios from 'axios';
import { memorizedRefreshToken } from '../api/Auth';

import { userStore } from '../store/userStore';

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

api.interceptors.response.use((config) => config, (async (error) => {
    console.log('error')
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        console.log('401')
        originalRequest._isRetry = true;
        try {
            console.log( 'TRY');
            const response = await memorizedRefreshToken();
            console.log( 'response.data');
            console.log( response.data);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            userStore.setAuthorize(true);
            console.log( localStorage.getItem('access'));
            return api.request(originalRequest);
        } catch (e) {
            console.log('e')
            console.log(e)
            userStore.setAuthorize(false);
        }
    }
        console.log('reject')
    return Promise.reject(error)
})
);

export default api;