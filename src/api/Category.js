import api from '../http/index';

export const getCategories = async () => {
    return  api.get('/store/categories/', );
};

export const getCategoryBySlug = async (slug) => {
    const usp = new URLSearchParams({slug})
    return  api.get('/store/categories/?' + usp.toString());
};