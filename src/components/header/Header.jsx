import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";

import { getCategories } from '../../api/Category';

import './header.scss';
import logo from './vx2.png';

const Header = () => {
    const [mainMenu, setMainMenu] = useState([]);
    const [subMenu, setSubMenu] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCategories();
            setMainMenu(res.data.filter(e => !e.parent));
            setSubMenu(res.data.filter(e => e.parent));
            console.log(res.data)
        };

        fetchData();
    }, []);

    const itemMenuNotAuthUser = (
        <ul className="auth-menu">
            <li className="item-menu"><Link to="/login">Login</Link></li>
            <li className="item-menu"><Link to="/registration">Registration</Link></li>
        </ul>
    );

    const itemMenuAuthUser = (
        <div className="auth-menu">
            <span >Logout</span>
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
                <div className="top">
                    <Link to="/admin" className="user">user</Link>
                    <div className="slogan">
                        russian warship <span className="fuck"> FUCK YOU</span>
                    </div>
                </div>
                <div className="menu">
                    <div className="wrapper-menu">
                        <ul className="nav-menu">
                            { mainMenu && mainMenu.map(e => {
                                return (
                                    <li key={e.id} className="item-menu">
                                        <Link to={e.slug}>{e.name}</Link>
                                        <div className="wrapper-sub-menu">
                                            {subMenu && subMenu.map(s => {
                                                return s.parent == e.id &&
                                                    (<div className="item-sub-menu" key={s.id}>{s.name}</div>)
                                            })}
                                        </div>
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

export default Header;