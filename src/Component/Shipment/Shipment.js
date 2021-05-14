import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [address, setAddress] = useState({
        address:'',
        phone:''
    })
    const savedCart = getDatabaseCart();
   const addressDetails = (e) => {
        const addAddress={...address}
        addAddress[e.target.name]=e.target.value;
        if (e.target.name==='phone') {
            address.phone=e.target.value
        }
        setAddress(addAddress)
        console.log(address);
    }
    const test = (e) => {
        const orderInfo = {...loggedInUser, product:savedCart, shipment:address}
        fetch('https://infinite-peak-87937.herokuapp.com/orderItems',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(orderInfo)
        })
        .then(res=>res.json())
        .then(result=>{
            if (result) {
                alert('your order success')
            }
        })
        e.preventDefault();
    }
    return (
        <Container>
            <Form className="from">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='userName' defaultValue={loggedInUser.name} required />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={loggedInUser.email} required />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name='address' onBlur={addressDetails} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" name='phone'  onBlur={addressDetails} required />
                </Form.Group>
                <Button variant='success' type='submit' onClick={test}>Confirm Order</Button>
            </Form>
        </Container>
    );
};

export default Shipment;