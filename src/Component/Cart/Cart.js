import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart
    let total = 0;
    let totalShipping = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        let Total = (total + product.price).toFixed(2);
        const totalNum = Number(Total);
        total = totalNum*product.quantity || 1;
        const shipping = (totalShipping + product.shipping).toFixed(2);
        totalShipping = Number(shipping)
    }
    if (totalShipping > 50) {
        totalShipping = 20
    }
    const stringGrandTotal = (total + totalShipping).toFixed(2);
    const grandTotal = Number(stringGrandTotal);
    return (
        <div className="summery">
            <h3>Order Summery</h3>
                <h6>Items ordered= {cart.length}</h6>
                <p>Items = ${total}</p>
                <p>Shipping = ${totalShipping}</p>
                <h5>Order total = ${grandTotal}</h5>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;