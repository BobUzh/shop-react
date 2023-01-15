import { productStore } from '../../store/productStore';

import './pagination.scss';

const Pagination = ({count}) => {

    const { setOffset } = productStore;
    const arr = [...Array(count).keys()];

    return (
        <div className="pagination">
            <ul>
                {arr.map((e,idx) => <li key={idx} onClick={() => setOffset(e)}>{++e}</li>)}
            </ul>
        </div>
    )
};

export default Pagination;