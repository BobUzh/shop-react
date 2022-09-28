import { CSSTransition } from 'react-transition-group';

import './slider.scss';
import img1 from './1a.png';
import img2 from './2a.png';
// import img3 from './3a.png';
import {useState} from "react";

const Slider = () => {
    const [next, setNext] = useState(() => false);
    const [img, setImg] = useState(() => img1);

    return (
        <div className="slider">
            <div className="btn-prev" onClick={() => setNext(true)}></div>
                <div className="img">
                    <CSSTransition
                        in={next}
                        timeout={800}
                        className="img-inner"
                        onEntered={() => setImg(img2)}>
                        <div className="img-inner">
                            <div className="img-front">
                                <img src={img} alt=""/>
                            </div>
                            <div className="img-back">
                                <img src={img} alt=""/>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
                <div className="text">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus laboriosam odit qui unde voluptas voluptates.</p>
                </div>
            <div className="btn-next"></div>
        </div>
    )
};

export default Slider;