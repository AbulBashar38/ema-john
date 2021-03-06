import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    
    const {img,name,price,seller,stock,key}=props.singleProduct;
    const handleAddCart = props.handleAddCart;
    return (
        <div className='product-container'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
            <h4><Link to={'/product/'+key}>{name}</Link></h4>
            <p>by {seller}</p>
            <h5>${price}</h5>
            <p><small>only {stock} left in stock- order soon</small></p>
            {props.addCardBtn===true &&<button className='cart-btn' onClick={()=>handleAddCart(props.singleProduct)}><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;