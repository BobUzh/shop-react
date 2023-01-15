import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import { getCategories } from '../../api/Category';
import { logout } from '../../api/Auth';

import { cartStore } from '../../store/cartStore';
import { userStore } from '../../store/userStore';

import './header.scss';
import logo from './vx2.png';
import cart from './shopping-cart-outline-svgrepo-com.svg'

import { observer } from 'mobx-react-lite';

const Header = () => {
    const [mainMenu, setMainMenu] = useState([]);
    const [subMenu, setSubMenu] = useState([]);
    const {toogleState, Count} = cartStore;

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCategories();
            setMainMenu(res.data.filter(e => !e.parent));
            setSubMenu(res.data.filter(e => e.parent));
        };

        fetchData();
    }, []);

    const logoutHandler = () => {
        try {
            logout();
            localStorage.removeItem('refresh');
            userStore.setAuthorize(false);
        } catch(e) {
            console.log(e);
        }
    }

    const itemMenuNotAuthUser = (
        <ul className="auth-menu">
            <li className="item-menu"><Link to="/login">Login</Link></li>
            <li className="item-menu"><Link to="/registration">Registration</Link></li>
        </ul>
    );

    const itemMenuAuthUser = (
        <ul className="auth-menu">
            <li className="item-menu" onClick={logoutHandler}>Logout</li>
        </ul>
    );

    const buildSubMenu = (menu) => subMenu.filter(e => e.parent == menu.id).length 
        ? (
            <div className="wrapper-sub-menu">
                {subMenu.map(s => s.parent == menu.id && <div className="item-sub-menu" key={s.id}><Link to={'category/' + s.slug}>{s.name}</Link></div>)}
            </div>
            )
        : ''

    const userMenuItems = userStore.isAuthorized ? itemMenuAuthUser : itemMenuNotAuthUser;

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>
            <div className="nav">
                <div className="top">
                    <Link to="/admin" className="user">user</Link>
                    <div className="slogan">
                        russian warship <span className="fuck"> FUCK YOU</span>
                        <span className="cart-link" onClick={toogleState}>
                            <img src={cart} alt="" />
                            <span>{Count}</span>
                        </span>
                    </div>
                </div>
                <div className="menu">
                    <div className="wrapper-menu">
                        <ul className="nav-menu">
                            { mainMenu && mainMenu.map(e => {
                                return (
                                    <li key={e.id} className="item-menu">
                                        <Link to={'category/' + e.slug}>{e.name}</Link>
                                        {buildSubMenu(e)}
                                    </li>
                                );
                            })}
                        </ul>
                        {userMenuItems}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default observer(Header);