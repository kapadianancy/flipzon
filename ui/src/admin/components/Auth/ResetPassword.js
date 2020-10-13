import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import * as classes from './Login.module.css';

const ForgotPassword = (props) => {
    const [user, setUser] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
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
        if(userObj.password === "") {
            errorObj.passwordError = "Password is required";
            errorObj.isFormValid = false;
        } else errorObj.emailError = "";
        if(userObj.confirmPassword !== userObj.password) {
            errorObj.confirmPasswordError = "Confirm Password is not equal to Password";
            errorObj.isFormValid = false;
        } else errorObj.emailError = "";
        setErrors(errorObj);
        if(errorObj.isFormValid) {
            submit();
        }
    }

    const submit = async () => {
        await props.resetPassword(user.password);
        props.goToLogin();
    }

    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Reset Password</h3>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                value={user.password} 
                isInvalid={ !errors.isFormValid && errors.passwordError !== "" } 
                onChange={(e) => valueChanged(e, "password")} 
            />
            <Form.Control.Feedback type="invalid">
                { errors.passwordError }
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Re-Enter Password" 
                value={user.confirmPassword} 
                isInvalid={ !errors.isFormValid && errors.confirmPasswordError !== "" } 
                onChange={(e) => valueChanged(e, "confirmPassword")} 
            />
            <Form.Control.Feedback type="invalid">
                { errors.confirmPasswordError }
            </Form.Control.Feedback>
        </Form.Group>

        { props.error ? <p className="text-danger">{props.error}</p> : null }
        { props.message ? <p className="text-info">{props.message}</p> : null }
        {
            props.loading ?
            <Spinner animation="border" /> :
            <Button variant="primary" type="submit">Submit</Button>
        }
        <div className="d-flex justify-content-center">
            <a href="#" onClick={() => props.goToLogin()}>Login here.</a>
        </div>
    </Form>
}

export default ForgotPassword