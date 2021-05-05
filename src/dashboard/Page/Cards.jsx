import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Cards.module.css';
import Cart from './Cart';

const Cards = () => {
    let [products, setProducts] = useState([]);
    let [shoppingCart, setShoppingCart] = useState([]);

    useEffect(() => {
        axios.get('https://607ed59302a23c0017e8c2c6.mockapi.io/api/products')
            .then(result => {
                const productsData = result.data;
                setProducts(productsData);
            });
    }, []);



    let productElements = products.map(product => {
        
        return (
            <div className={classes.item} key={product.id}>
                <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt={product.id} />
                <div className={classes.information}>
                    <p className={classes.name}>{product.title}</p>
                    <p className={classes.description}>{product.description}</p>
                    <p className={classes.price}>price: {product.price}</p>
                    <button className={classes.btn} onClick={() => addProduct(product.id)}>Add</button>
                </div>
            </div>
        );
    });


    function addProduct(id) {
        const clonedProducts = [...products];
        let foundProduct = clonedProducts.find(product => product.id == id);

       const clonedShoppingCart = [...shoppingCart];
       clonedShoppingCart.push(foundProduct);
       setShoppingCart(clonedShoppingCart);
    }

    return (
        <div>
            <div className={classes.cards}>
                {productElements}
            </div>

            <div>
                <Cart  shoppingCart={shoppingCart} description="Василина"/>
            </div>
        </div>

    );
}

export default Cards;