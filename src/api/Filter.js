import api from '../http/index';

export const getFilters = async (params) => {
    const usp = new URLSearchParams(params);
    return  api.get('/store/filters/?' + usp.toString());
};