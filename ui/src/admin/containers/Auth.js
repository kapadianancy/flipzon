import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image'

import Logo from '../../images/logo-2.jpg'
import * as classes from './Auth.module.css'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import { login, register, forgotPassword } from '../store/actions/AuthActions'
import ForgotPassword from '../components/Auth/ForgotPassword'

const Auth = (props) => {
    const [activeKey, setActiveKey] = useState("login")
    const login = async (email, password) => {
        try {
            await props.login(email, password);
            props.history.push("/admin/dashboard");
        } catch(error) {
            console.log(error);
        }
        
    }
    const register = async (userObj) => {
        try{
            await props.register(userObj);
            setActiveKey("login")
        } catch(error) {
            console.log(error);
        }
    }

    const forgotPassword = async (email) => {
        try {
            await props.forgotPassword(email);
            // setActiveKey("login");
        } catch(error) {
            console.log(error);
        }
    }

    let content =  <Login 
        login={login} 
        goToForgotPassword={ () => setActiveKey("forgotPassword") } 
        goToRegister={() => setActiveKey("register")} 
        loading={props.loading} error={props.loginError} 
    />;
    if(activeKey === "register") {
        content = <Register 
            register={register} 
            goToLogin={() => setActiveKey("login")} 
            loading={props.loading} 
            error={props.registerError} 
        />
    } else if(activeKey == "forgotPassword") {
        content = <ForgotPassword 
            goToLogin={ () => setActiveKey("login") } 
            loading={props.loading} 
            error={props.forgotPasswordError}
            forgotPassword={forgotPassword}
            message={props.message}
        />
    }
    return <div className={classes.Container}>
        <Card className={classes.Card}>
        <Card.Header className={classes.CardHeader}><Image  className={classes.Logo} src={Logo} /></Card.Header>
            <Card.Body className={classes.CardBody}>
                { content }
            </Card.Body>
        </Card>
    </div>
}

const mapStateToProps = state => {
    return {
        loading: state.adminAuth.loading,
        registerError: state.adminAuth.registerError,
        loginError: state.adminAuth.loginError,
        message: state.adminAuth.message,
        forgotPasswordError: state.adminAuth.forgotPasswordError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        register: (user) => dispatch(register(user)),
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)