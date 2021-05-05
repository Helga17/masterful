import React from 'react';
import classes from './FooterRight.module.css';

const FooterRight = (props) => {
    return (
        <div className={classes.col }> 
        <div className={classes.title}>Зв'язатися</div>
        <div className={classes.contact}>
            <div>Адреса: м. Запоріжжя, проспект Соборний <span className={classes.number}>210</span></div>
            <div className={classes.phone}>Телефон: +38 (093) 12 234 45</div>
            <div>Пошта: info@masterful.com</div>
        </div>
    </div>
    );
}

export default FooterRight;