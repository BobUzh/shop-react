import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';
import removeIcon from './delete-icon.svg';

import './cart-item.scss';

const CartItem = ({item}) => {
    const {incCount, decCount, removeProduct} = cartStore;
    console.log(item);

    return (
        <div className="cart-item">
            <div className="cart-item-detail">
                <div className="cart-item-detail-image">
                    <img src={item.image} alt="" />
                </div>
                <div className="cart-item-detail-info">
                    <a href="#" className='cart-item-detail-info-title'>{item.name}</a>
                    <div className="cart-item-detail-info-charakteristic">Фруктові</div>
                    <div className="cart-item-detail-info-quantity">
                        <div className={item.errors ? 'error quantity' : 'quantity'}>
                            <span onClick={() => decCount(item.id)}>-</span>
                            <input type="text" value={item.count}/>
                            <span onClick={() => incCount(item.id)}>+</span>
                            {item?.errors && <span className='error-quantity'>{item.errors.available_quantity + ' psc'}</span>}
                        </div>
                        <div className="price">{item.price}</div>
                        <img src={removeIcon} alt="" onClick={() => removeProduct(item.id)}/>
                    </div>
                    {item?.errors?.message && <span className='error-text'>{item.errors.message}</span>}
                </div>
            </div>
        </div>
    );
}

export default observer(CartItem);