import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './Login.css'
import { initializeConfig, signInForEmail, signInForFacebook, signInForGoogle, signUpForEmail } from './LoginManager'


initializeConfig()
const Login = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
    })

    const [newUser, setNewUser] = useState(false);

    const authByEmail = (e) => {
        if (newUser && user.email && user.password) {
            signUpForEmail(user.name, user.email, user.password)
                .then(res => {
                    setUser(res)
                })
        }
        if (!newUser && user.email && user.password) {
            signInForEmail(user.email, user.password)
                .then(res => {
                    setUser(res)
                })
        }
        e.preventDefault()
    }
    const emailPassChecker = (e) => {
        let isValid;
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isValid = isEmailValid;
        }
        if (e.target.name === 'password') {

            const validLength = e.target.value.length > 6;
            const characterValid = /\d{1}/.test(e.target.value)
            isValid = validLength && characterValid;
        }
        if (e.target.name === 'name') {
            const name = e.target.value.length > 0;
            isValid = name
        }
        if (isValid) {

            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo)
        }
    }

    const googleSignIn = () => {
        signInForGoogle()
            .then(res => {
                setUser(res)
            })
    }
    const facebookSignIn = () =>{
        signInForFacebook()
        .then(res=>{
            setUser(res)
        })
    }
    return (
        <Container className="body">
            <Form className="from">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check onChange={() => setNewUser(!newUser)} type="checkbox" label="Check me out if you are a new user" />
                </Form.Group>
                {newUser && <Form.Group>
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onBlur={emailPassChecker} name='name' required />
                </Form.Group>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' onBlur={emailPassChecker} placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" onBlur={emailPassChecker} placeholder="Password" required />
                </Form.Group>
                <Form.Group>
                    <Button onClick={authByEmail} variant="primary" type="submit" block>
                        {newUser ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col md={6}>
                            <Button onClick={googleSignIn} variant="success">With Google</Button>
                        </Col>
                        <Col md={6}>
                            <Button onClick={facebookSignIn} variant="info">With Facebook</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Login;