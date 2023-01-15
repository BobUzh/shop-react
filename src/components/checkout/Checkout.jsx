import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { cartStore } from '../../store/cartStore';
import { getCities, getDepartments } from '../../api/Np';
import { setOrder } from '../../api/Order';

import CartItem from '../cart-item/CartItem';

import './checkout.scss'

const Checkout = () => {
    const {products, subtotal, stateOff, productsForOrder, error, orderCode, setOrderCode, clearProductsOrder} = cartStore;
    const [cities, setCities] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState([1]);
console.log('CHECKOUT');
console.log( products.length);
    stateOff();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCities();
            setCities(res.data.results);
        };

        fetchData();
    },[]);

    const changeCity = async (e) => {
        const res = await getDepartments(e.target.value);
        setDepartments(res.data.results)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await setOrder({products:productsForOrder, customer:{
                'first_name':e.target.first_name.value,
                'last_name':e.target.last_name.value,
                'email':e.target.email.value,
                'address':e.target.address.value,
            }});
            console.log('===');
            console.log(res);
            setOrderCode(res.data.uuid);
            clearProductsOrder();
        } catch(e) {
            let errors1 = [];
            if (e.response.data.hasOwnProperty('product errors')) {
                const errorProducts = e.response.data['product errors'];
                
                errorProducts.map(el => {
                    const arrKey = Object.keys(el)
                    let obj = {}
                    arrKey.map(key => {
                        obj = JSON.parse(JSON.stringify(el[key]))
                        // Object.assign(obj[el[key]['product_id']], el[key])
                        error(el[key]['product_id'], key, obj)
                        console.log(obj)
                    })
                    if (Object.keys(obj).length) errors1.push(obj)
                })
                setErrors(errors1);
            }
        }
    }

    const $listOfOrderProducts = !!products.length && 
    (
        <>
            {products.map(e => <CartItem key={e.id} item={e}/>)}
            <p>SUBTOTAL: { subtotal }</p>
        </>
    )

    const $messageOfSuccessfulOrder = orderCode && 
    (
        <>
            <p style={{color: '#09ff09'}}>Замовлення пройшло успішно</p>
            <p>код для перевірки статусу замовлення (збережіть його)</p>
            <h2>{orderCode}</h2>
        </>
    )

    return (
        <form onSubmit={submitHandler}>
            <h1>Оформлення замовлення</h1>
            <div className="checkout" style={!!products.length ? {} : {columnGap: 0}}>
                <div className="checkout-cart">
                    {$listOfOrderProducts}
                    {$messageOfSuccessfulOrder}
                </div>
                <div className="checkout-form">
                    <div className="contact">
                        <p>Ваші контактні дані</p>
                        <div className='form-group'>
                            <label htmlFor="first_name">Ім'я</label>
                            <input type="text" name="first_name"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="last_name">Фамилія</label>
                            <input type="text" name="last_name"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Е-mail</label>
                            <input type="text" name="email"/>
                        </div>
                    </div>
                    <div className="delivery">
                        <p>Доставка (Нова Пошта )</p>
                        <div className='form-group'>
                            <label htmlFor="">Місто</label>
                            <select name="city" id="" onChange={changeCity}>
                                <option value=""></option>
                                {cities && cities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="address">Відділення</label>
                            <select name="address">
                                {departments && departments.map(e => <option key={e.id} value={e.department + ': ' + e.address}>{e.department + ': ' + e.address}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="payment">
                        <p>Оплата</p>
                        <div className='form-'>
                            <div>
                                <label htmlFor="">Оплата при полученні
                                    <input type="radio" name="payment"/>
                                </label>
                                <label htmlFor="">Оплата на карту
                                    <input type="radio" name="payment"/>
                                </label>  
                            </div>
                        </div>
                    </div>
                    <button>Оформити замовлення</button>
                    {console.log(errors)}
                </div>
            </div>
        </form>
    );
}

export default observer(Checkout);