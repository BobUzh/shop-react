import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { getFilters } from '../../api/Filter';
import { productStore } from '../../store/productStore';

import Checkbox from '../checkbox/Checkbox';

import './filter.scss';

const Filter = ({categoryname}) => {
    console.log('Filter.jsx')
    const { setFilter } = productStore;

    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    console.log(categoryname)
    console.log(selectedFilters)

    useEffect(() => {
        console.log('useEffect FILTER')
        setSelectedFilters({})
        const fetchData = async () => {
            const res = await getFilters({'category_slug': categoryname}); 
            setFilters(res.data);
            console.log(res.data);
        }

        fetchData();
    }, [categoryname]);

    const selectFilter = (isChecked, id, parent) => {
        let newState =  {...selectedFilters};
        newState[parent] = newState[parent] ?? [];
        newState[parent] = isChecked 
            ? [...newState[parent], id] 
            : newState[parent].filter(e => e != id);

        if (! newState[parent].length) delete newState[parent];

        setSelectedFilters(prevState => newState)
    }

    const buildCharacteristic = (characteristic) => (
        <div key={characteristic.id} className="characteristic" style={{marginBottom: '20px'}}>
            <div className="title" style={{marginBottom: '10px'}}>{characteristic.name}</div>
            {characteristic.options.map(option => {
                let checked = selectedFilters[characteristic.name]?.includes(option.id);
                return (
                    <Checkbox 
                        key={option.id} 
                        data={{...option, parent:characteristic.name, ckecked: checked}} 
                        change={selectFilter}/>
                )
            })}
        </div>
    );

    return (
        <div className="filter">
            <div>
                <h3>FILTER</h3>
                {filters && filters.map(elem => buildCharacteristic(elem))}
            </div>
            <button onClick={() => setFilter(selectedFilters)}>OK</button>
        </div>
    )
};

export default observer(Filter);