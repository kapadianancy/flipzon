import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import * as classes from './Login.module.css';

const Login = (props) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
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
        if(userObj.email === "") {
            errorObj.emailError = "Email is required";
            errorObj.isFormValid = false;
        } else errorObj.emailError = "";
        if(userObj.password === "") {
            errorObj.passwordError = "Password is required";
            errorObj.isFormValid = false;
        } else errorObj.passwordError = "";
        setErrors(errorObj);
        if(errorObj.isFormValid) {
            submit();
        }

    }

    const submit = () => {
        props.login(user.email, user.password);
    }
    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Login</h3>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={user.email} 
                isInvalid={ !errors.isFormValid && errors.emailError !== "" } 
                onChange={(e) => valueChanged(e, "email")} 
            />
            <Form.Control.Feedback type="invalid">
                { errors.emailError }
            </Form.Control.Feedback>
        </Form.Group>
    
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                value={user.password} 
                isInvalid={ !errors.isFormValid && errors.passwordError !== "" } 
                onChange={(e) => valueChanged(e, "password")} 
            />
            <Form.Control.Feedback type="invalid">
                { errors.passwordError }
            </Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        { props.error ? <p className="text-danger">{props.error}</p> : null }
        {
            props.loading ?
            <Spinner animation="border" /> :
            <Button variant="primary" type="submit">Login</Button>
        }
        <div className="d-flex justify-content-center">
            <a href="#" onClick={() => props.goToRegister()}>Don't have an account? Register here.</a>
        </div>
    </Form>
}

export default Login