import { Link } from 'react-router-dom';

import './header.scss';
import logo from './vx2.png';

const Header = () => {
    const itemMenuNotAuthUser = (
        <div className="auth-menu">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
        </div>
    );
    const itemMenuAuthUser = (
        <div className="auth-menu">
            <li >Logout</li>
        </div>
    );

    const userMenuItems = 1 ? itemMenuNotAuthUser : itemMenuAuthUser;

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>
            <div className="nav">
                <div className="nav-top">
                    <Link to="/admin" className="user">user</Link>
                    <div className="slogan">
                        russian warship <span className="fuck"> FUCK YOU</span>
                    </div>
                </div>
                <div className="nav-bottom">
                    <ul>
                        <div className="nav-menu">
                            <li><Link to="/product">PRODUCTS</Link></li>
                            <li><Link to="/product">CATEGORIES</Link></li>
                        </div>
                        {userMenuItems}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Header;