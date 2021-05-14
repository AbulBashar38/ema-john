import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {

    const [products, setProduct] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('https://infinite-peak-87937.herokuapp.com/getProductInfo')
            .then(res => res.json())
            .then(result => {
                setProduct(result);
            })
    })
    useEffect(() => {

        const getKeysAndValue = getDatabaseCart();
        const keys = Object.keys(getKeysAndValue);
        fetch('https://infinite-peak-87937.herokuapp.com/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(result => {
                setCart(result)
            })
    }, [products])
    const handleAddCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='shop-container'>
            <div className='product-show'>
                {
                    products.length === 0 && <h1>Loading...</h1>
                }
                {products.map(product => <Product addCardBtn={true} handleAddCart={handleAddCart} singleProduct={product} key={product.key}></Product>)}
            </div>
            <div>
                <Cart cart={cart}>
                    <Link to='/order'>
                        <Button variant="contained" color="secondary" size="large">Review</Button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;