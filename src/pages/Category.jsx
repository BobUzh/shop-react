
import Filter from '../components/filter/Filter';
import Card from '../components/card/Card';
import Pagination from '../components/pagination/Pagination';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { productStore } from '../store/productStore';
import { observer } from 'mobx-react-lite';

const Category = () => {
    console.log('Categories.jsx')
    const { categoryname } = useParams();
    const { 
        countOfPages,
        products,
        category_slug,
        filter,
        loadProducts,
        setCategory,
        setOffset,
        } = productStore;

    console.log(categoryname)
    if (categoryname !== category_slug) {
        setCategory(categoryname);
    }
    
    useEffect(() => {
        console.log('UseEffect CATEGORIES') 
        loadProducts();
    },[filter])

    const style = {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '15px',
        flexWrap: 'wrap',
        borderTop: '2px solid white'
    }

    return (
        <div className="categories">
            <Filter categoryname={categoryname}/>
            <div className="content" style={{flex:'4 4',justifyContent:'space-between', display:'flex', flexDirection:'column'}}>
                <div className="product-list">
                    <div style={style}>
                        
                        {products && products.map((e) => {
                            return (
                                <Card key={e.id} card={e} />
                            );
                        })}
                    </div>
                </div>
                <Pagination count={countOfPages} changePage={(p) => setOffset(p)}/>
            </div>
        </div>
    )
};

export default observer(Category);
