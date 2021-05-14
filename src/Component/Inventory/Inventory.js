import { Container } from '@material-ui/core';

import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Inventory = () => {
    const addingUSerInfo = {}
    const handelAddData = () => {
        fetch('https://infinite-peak-87937.herokuapp.com/addProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addingUSerInfo)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    }
    return (
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Form className="from">


                <Form.Label>Category</Form.Label>
                <Form.Control type="text" required />



                <Form.Label>Product name</Form.Label>
                <Form.Control type="text" required />



                <Form.Label>seller</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>wholePrice</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>priceFraction</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>stock</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>star</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>starCount</Form.Label>
                <Form.Control type="text" required />


                <Form.Label>price</Form.Label>
                <Form.Control type="text" required />

                <Form.Group>
                    <Form.Label>shipping</Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>

                <Button variant="primary" onClick={handelAddData} disabled>Add to database</Button>

            </Form>
        </Container>
    );
};

export default Inventory;