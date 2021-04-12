import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart
    let total = 0;
    let shipping = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        let Total = (total + product.price).toFixed(2);
        total = Number(Total);
        shipping = shipping + product.shipping;
    }
    if (shipping > 50) {
         shipping = 20
    }
    const grandTotal = total + shipping;
    return (
        <div className="summery">
            <h3>Order Summery</h3>
                <h6>Items ordered= {cart.length}</h6>
                <p>Items = ${total}</p>
                <p>Shipping = ${shipping}</p>
                <h5>Order total = ${grandTotal}</h5>
        </div>
    );
};

export default Cart;