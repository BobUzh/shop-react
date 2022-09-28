import api from '../http/index';

export const getProductsByCategory = async (id) => {
    return  api.get('/store/products/?category=' + id);
};
