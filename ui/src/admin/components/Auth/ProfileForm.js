import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import * as classes from './ProfileForm.module.css';

const ProfileForm = (props) => {
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

    const submit = async () => {
        await props.submit(user);
        const userObj = {
            ...user,
            password: "",
            confirmPassword: ""
        }
        setUser(userObj);

    }

    return <Form className={classes.Form} onSubmit={validate}>
        <h3 className={classes.h3}>Manage Profile</h3>

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
        <Button variant="primary" type="submit">{
            props.loading ? "Updating..." : "Update"
        }</Button>
    </Form>
}

export default ProfileForm