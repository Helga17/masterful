import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

    const logout = () => {
        props.setUser(null);
        localStorage.removeItem('passport');
        sessionStorage.removeItem('user');
    }

    return (
        <div className={classes.navbar}>
            <div className={classes.container}>
                <div className={classes.inner}>
                    <div><NavLink to="/" className={classes.logo}>Masterful</NavLink>
                        <NavLink to="/workshop" className={classes.item}>Майстер класи</NavLink>
                        <NavLink to="/blog" className={classes.item}>Блог</NavLink>
                    </div>

                    <div className={classes.dropdown}>
                        <span>{props.currentUser ? <p>{props.currentUser.name}</p> : <p>Увійти до системи</p>}</span>
                        <div className={classes.dropdownContent}>
                            <div>{props.currentUser && <NavLink to="/user" className={classes.item}>Записи</NavLink>} </div>
                            <div>{props.currentUser && <NavLink to="/" className={classes.item} onClick={logout}>Вийти</NavLink>} </div>
                            <div>{props.currentUser === null && <NavLink to="/login" className={classes.item}>Увійти</NavLink>}</div>
                            <div>{props.currentUser === null && <NavLink to="/register" className={classes.item}>Зареєструватися</NavLink>}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;