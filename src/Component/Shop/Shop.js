import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css'
const Shop = () => {
    const frist10 = fakeData.slice(0,10);
    const [products, setProduct]=useState(frist10)
    const [cart, setCart] = useState([])
    const handleAddCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        
    }
    return (
        <div className='shop-container'>
            <div className='product-show'>
                {products.map(product =><Product handleAddCart = {handleAddCart} singleProduct ={product}></Product>)}
            </div>
            <div>
                <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;