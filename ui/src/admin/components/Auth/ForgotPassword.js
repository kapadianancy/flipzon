import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import * as classes from './Login.module.css';

const ForgotPassword = (props) => {
    const [user, setUser] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({
        emailError: "",
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
        setErrors(errorObj);
        if(errorObj.isFormValid) {
            submit();
        }
    }

    const submit = () => {
        props.forgotPassword(user.email);
    }

    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Forgot Password</h3>

        <Form.Group controlId="formForgotPassword">
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
            <Form.Text className="text-muted">
                New password will be shared on your email address.
            </Form.Text>
        </Form.Group>

        { props.error ? <p className="text-danger">{props.error}</p> : null }
        { props.message ? <p className="text-info">{props.message}</p> : null }
        {
            props.loading ?
            <Spinner animation="border" /> :
            <Button variant="primary" type="submit">Login</Button>
        }
        <div className="d-flex justify-content-center">
            <a href="#" onClick={() => props.goToLogin()}>Login here.</a>
        </div>
    </Form>
}

export default ForgotPassword