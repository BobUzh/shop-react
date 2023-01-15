import { cartStore } from '../../store/cartStore';

import './card.scss';

const Card = ({card}) => {
    const { addProduct } = cartStore;

    return (
            <div className="card" key={card.id}>
                <div className="name">{card.name}
                    {/* <span>15мл 50мг</span> */}
                </div>
                <div className="img">
                    <img src={card.image} alt=""/>
                </div>
                <div className="price">{card.price}</div>
                <div>
                    <div className="btn" onClick={() => addProduct(card)}>ADD TO CART</div>
                    <div className="more">MORE</div>
                </div>
            </div>
    )
};

export default Card;