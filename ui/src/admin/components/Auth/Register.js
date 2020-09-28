import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import * as classes from './Register.module.css';

const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        isFormValid: false
    });

    const valueChanged = (e, type) => {
        let userObj = { ...user }
        userObj[type] = e.target.value;
        setUser(userObj);
    }

    const validate = (e) => {
        e.preventDefault();
        let errorObj = {
            ...errors,
            isFormValid: true
        }
        let userObj = {...user}
        if(userObj.username === "") {
            errorObj.usernameError = "Username is required";
            errorObj.isFormValid = false;
        } else errorObj.usernameError = "";
        if(userObj.email === "") {
            errorObj.emailError = "Email is required";
            errorObj.isFormValid = false;
        } else errorObj.emailError = "";
        if(userObj.password === "" || userObj.password.length < 8) {
            errorObj.passwordError = "Password should be more than 7 characters";
            errorObj.isFormValid = false;
        } else errorObj.passwordError = "";
        if(userObj.confirmPassword === "" || userObj.password !== userObj.confirmPassword) {
            errorObj.confirmPasswordError = "Confirm password should be match with Password";
            errorObj.isFormValid = false;
        } else errorObj.confirmPasswordError = "";
        setErrors(errorObj);
        if(errorObj.isFormValid) {
            submit();
        }
    }

    const submit = () => {
        const userObj = { ...user }
        delete userObj.confirmPassword;
        props.register(userObj);
    }

    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Register</h3>

        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
                type="text" 
                value={user.username} 
                placeholder="Your Name" 
                onChange={(e) => valueChanged(e, "username")} 
                isInvalid={ !errors.isFormValid && errors.usernameError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.usernameError }
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={user.email} 
                onChange={(e) => valueChanged(e, "email")} 
                isInvalid={ !errors.isFormValid && errors.emailError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.emailError }
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                value={user.password} 
                onChange={(e) => valueChanged(e, "password")} 
                isInvalid={ !errors.isFormValid && errors.passwordError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.passwordError }
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Confirm Password" 
                value={user.confirmPassword} 
                onChange={(e) => valueChanged(e, "confirmPassword")} 
                isInvalid={ !errors.isFormValid && errors.confirmPasswordError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.confirmPasswordError }
            </Form.Control.Feedback>
        </Form.Group>
        
        { props.error ? <p className="text-danger">{props.error}</p> : null }
        <Button variant="success" type="submit">
            Register
        </Button>
        <div className="d-flex justify-content-center">
            <a href="#" onClick={() => props.goToLogin()}>Already have an account? Login here.</a>
        </div>
    </Form>
}

export default Register