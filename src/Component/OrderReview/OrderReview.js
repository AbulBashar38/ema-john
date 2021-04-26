import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { Button } from '@material-ui/core';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewData from '../RivewData/ReviewData';

const OrderReview = () => {
    const [showProducts, setShowProducts] = useState([])
    const removeProduct = productKey => {
        const newProduct = showProducts.filter(product => product.key !== productKey)
        setShowProducts(newProduct);
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const getKeysAndValue = getDatabaseCart();
        const keys = Object.keys(getKeysAndValue);
        const ReviewProduct = keys.map(key => {
            const matchProduct = fakeData.find(product => product.key === key)
            matchProduct.quantity = getKeysAndValue[key]
            return matchProduct;
        })
        setShowProducts(ReviewProduct)
    }, [])
    return (
        <div>
            <h1>Your order {showProducts.length}</h1>
            <div className="shop-container">
                <div className='product-show'>
                    {
                        showProducts.map(product => <ReviewData product={product} removeProduct={removeProduct} key={product.key}></ReviewData>)
                    }
                </div>
                <div>
                    <Cart cart={showProducts}>
                    <Button variant="contained" color="secondary" size="large">Checkout</Button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;