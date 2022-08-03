import img1 from './1.png';
import './home.scss';

const Home = () => {

    return (
        <>
            <section className="welcome">
                <h3>IT WOULD BE BETTER IF YOU DIDN'T SMOKE</h3>
                <h3>BUT</h3>
                <h3>IF YOU STILL SMOKE THEN WELCOME</h3>
            </section>
            <section className="about-us">
                <div className="img-left">
                    <img src={img1} alt=""/>
                </div>
                <div className="text">
                    <span>ABOUT US</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam distinctio ea perspiciatis repellat suscipit vitae.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque, dicta dolore, dolorum fugit nesciunt obcaecati odit perspiciatis porro quasi repellat, tempora veritatis vero voluptatem.</p>
                </div>
                <div className="img-right">
                    <img src={img1} alt=""/>
                </div>
            </section>
            <section className="welcome">
                <h3>GETTING IN RIGHT SINCE 1982</h3>
            </section>
        </>
    )
};

export {Home};