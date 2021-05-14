import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams()
    const [singleProduct,setSingleProduct]=useState({})
    useEffect(()=>{
        fetch('https://infinite-peak-87937.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(result=>{
            setSingleProduct(result)
        })
    },[productKey])
    return (
        <div>
            <Product addCardBtn = {false} singleProduct={singleProduct}></Product>
        </div>
    );
};

export default ProductDetails;