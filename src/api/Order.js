import api from '../http/index';

export const setOrder = async (params) => {
    return api.post('/store/orders/', params);
};