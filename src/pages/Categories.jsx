import { getCategoryBySlug } from '../api/Category';
import { getProductsByCategory } from '../api/Product';

import Filter from '../components/filter/Filter';
import Card from '../components/card/Card';
import Pagination from '../components/pagination/Pagination';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Categories = () => {
    const { categoryname } = useParams();
    const [curretCategory, setCurrentCategory] = useState()
    const [products, setProducts] = useState(() => []);
    
    useEffect(() => {
        const fetchData = async () => {
            const category = await getCategoryBySlug(categoryname);
            const allProducts = await getProductsByCategory(category.data[0].id);
            console.log('===');
            console.log(allProducts);
            setProducts(allProducts.data);
        }

        fetchData();
    }, [categoryname])

    const style = {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '15px',
        flexWrap: 'wrap',
        borderTop: '2px solid white'
    }

    return (
        <div className="categories">
            <Filter />
            <div className="content" style={{flex:'4 4'}}>
                <div className="product-list">
                    <div style={style}>
                        {products && products.map((e) => {
                            return (
                                <Card card={e} />
                            );
                        })}
                    </div>
                </div>
                <Pagination />
            </div>
        </div>
    )
};

export default Categories;