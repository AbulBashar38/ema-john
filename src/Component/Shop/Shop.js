import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const frist10 = fakeData.slice(0,10);
    const [products, setProduct]=useState(frist10)
    const [cart, setCart] = useState([])
    useEffect(()=>{
        const getKeysAndValue = getDatabaseCart();
        const keys = Object.keys(getKeysAndValue);
        const cartProduct = keys.map(key=> {
            const matchProduct = fakeData.find(product => product.key === key)
            matchProduct.quantity = getKeysAndValue[key]
            return matchProduct;
        })
        setCart(cartProduct)
    },[])
    const handleAddCart = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
         let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    
    return (
        <div className='shop-container'>
            <div className='product-show'>
                {products.map(product =><Product addCardBtn={true} handleAddCart = {handleAddCart} singleProduct ={product} key ={product.key}></Product>)}
            </div>
            <div>
                <Cart cart = {cart}>
                <Link to='/order'>
                <Button variant="contained" color="secondary" size="large">Review</Button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;