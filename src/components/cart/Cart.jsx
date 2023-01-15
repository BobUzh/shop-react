import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { cartStore } from '../../store/cartStore';

import './cart.scss';
import CartItem from '../cart-item/CartItem';

const Cart = () => {
    const {toogleState, incCount, decCount, removeProduct, isShow, products, Count, subtotal} = cartStore;
    console.log('isShow');
    console.log(isShow);

    return (
        <div className={ isShow ? 'cart active' : 'cart'}>
            <div className='cart-inner'>
                <div className="cart-inner-header">
                    <div className="counter">
                        <span>CART</span>
                        <span>item ({Count})</span>
                    </div>
                    <div className="close" onClick={toogleState}>
                        <svg width="14" height="14" className="icon icon-close " viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path fill="white" d="M1 1L7.53613 7.53613M8.17736 8.17736L14.7135 14.7135M15.1981 1.15657L8.66202 7.6927M8.02079 8.33392L1.48466 14.8701" stroke="white" strokeLinecap="square"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="cart-inner-content">
                    {products && products.map(e => <CartItem key={e.id} item={e} />)}
                </div>
            </div>
            <div>
                <div className="cart-subtotal">
                    <span>Total</span>
                    <span>{subtotal} ua</span>
                </div>
                <div className="cart-footer">
                    <Link to="checkout">Оформити заказ</Link>
                </div>
            </div>
        </div>
    )
}

export default observer(Cart);