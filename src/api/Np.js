import api from '../http/index';

export const getCities = async () => {
    return  api.get('/store/cities/');
};

export const getDepartments = async (id) => {
    return  api.get(`/store/np_departments?city_id=${id}`);
};