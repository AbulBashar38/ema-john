import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewData from '../RivewData/ReviewData';
import { useHistory } from 'react-router';

const OrderReview = () => {
    const [showProducts, setShowProducts] = useState([])
    const history = useHistory()
    const removeProduct = productKey => {
        const newProduct = showProducts.filter(product => product.key !== productKey)
        setShowProducts(newProduct);
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const getKeysAndValue = getDatabaseCart();
        const keys = Object.keys(getKeysAndValue);
        let mounted = true;
        
        fetch('https://infinite-peak-87937.herokuapp.com/review',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(keys)
        })
        .then(res=>res.json())
        .then(result=>{
            if (mounted) {
                setShowProducts(result)
            }
            return null;
        })
        return () => mounted = false;
    }, [])
    const handelCheckout=()=>{
        history.push('/shipment')
    }
    
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
                    <Button onClick={handelCheckout} variant="contained" color="secondary" size="large">Checkout</Button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;