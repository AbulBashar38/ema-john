import React from 'react';
import { useParams } from 'react-router';

import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams()
    const singleProduct = fakeData.find(product => product.key === productKey)
    return (
        <div>
            <Product addCardBtn = {false} singleProduct={singleProduct}></Product>
        </div>
    );
};

export default ProductDetails;