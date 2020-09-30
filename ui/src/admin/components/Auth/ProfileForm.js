import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import * as classes from './ProfileForm.module.css';

const ProfileForm = (props) => {
    const [done, setDone] = useState(false)
    const [user, setUser] = useState({
        username: props.user.username,
        email: props.user.email,
        password: "",
        confirmPassword: "",
    });
    
    const [errors, setErrors] = useState({
        usernameError: "",
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
        if(userObj.password !== "" && userObj.password.length < 8) {
            errorObj.passwordError = "Password should be more than 7 characters";
            errorObj.isFormValid = false;
        } else errorObj.passwordError = "";
        if(userObj.password !== "" && userObj.password !== userObj.confirmPassword) {
            errorObj.confirmPasswordError = "Confirm password should be match with Password";
            errorObj.isFormValid = false;
        } else errorObj.confirmPasswordError = "";
        setErrors(errorObj);
        if(errorObj.isFormValid) {
            submit();
        }
    }

    const submit = async () => {
        let userObj = {
            ...user,
        }
        if(userObj.password === "") {
            delete userObj.password;
            delete userObj.confirmPassword;
        }
        await props.submit(userObj);
        userObj = {
            ...user,
            password: "",
            confirmPassword: ""
        }
        setUser(userObj);
        setDone(true);
        setTimeout( () => { setDone(false) }, 5000)
    }

    let alert = null;
    if(done) {
        alert = <Alert variant="info">
            Your profile updated!
        </Alert>
    }
    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Manage Profile</h3>
        {alert}
        <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter name"
                value={user.username}
                onChange={(e) => valueChanged(e, "username")} 
                isInvalid={ !errors.isFormValid && errors.usernameError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={user.email}
                disabled
            />
        </Form.Group>

        <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter New Password"
                value={user.password}
                onChange={(e) => valueChanged(e, "password")} 
                isInvalid={ !errors.isFormValid && errors.passwordError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.passwordError }
            </Form.Control.Feedback>

        </Form.Group>

        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Re-Enter New Password" 
                value={user.confirmPassword} 
                onChange={(e) => valueChanged(e, "confirmPassword")} 
                isInvalid={ !errors.isFormValid && errors.confirmPasswordError !== "" } 
            />
            <Form.Control.Feedback type="invalid">
                { errors.confirmPasswordError }
            </Form.Control.Feedback>
        </Form.Group>

        { props.error ? <p className="text-danger">{props.error}</p> : null }
        {
            props.loading ?
            <Spinner animation="border" />:
            <Button variant="primary" type="submit">Update</Button>
        }
    </Form>
}

export default ProfileForm