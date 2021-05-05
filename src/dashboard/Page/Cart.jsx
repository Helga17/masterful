import React, { useState, useEffect } from 'react';
import classes from './Cart.module.css';

const Cart = (props) => {
    let shoppingCartElements = props.shoppingCart.map((product, index) => {
        return (
            <div className={classes.item} key={index}>
                <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt={product.id} />
                <div className={classes.information}>
                    <p className={classes.name}>{product.title}</p>
                    <p className={classes.description}>{product.description}</p>
                    <p className={classes.price}>price: {product.price}</p>
                    <button className={classes.btn} onClick={() => deleteProduct(index)}>Delete</button>

                </div>
            </div>
        );
    });

    function deleteProduct(index) {

    }

    return (
        <div className={classes.modal}>
             <p>Cart</p>
            <div className={classes.carts}>
               
                {shoppingCartElements}
            </div>
        </div>

    );
}

export default Cart;