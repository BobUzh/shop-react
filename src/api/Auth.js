import api from '../http/index';
import axios from "axios";

import mem from 'mem';

export const registration = async (params) => {
    return  api.post('/register/', params);
};

export const login = async (params) => {
    return  api.post('/auth/login/', params);
};

export const logout = async () => {
    const refresh = localStorage.getItem('refresh');
    return  api.post('/auth/logout', {'refresh_token': refresh});
};

export const product = async () => {
    return  api.get('/product');
};

export const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    return  api.post('/auth/token/refresh/', {'refresh': refresh});
};

const maxAge = 10000;
export const memorizedRefreshToken = mem(refreshToken, {maxAge})
