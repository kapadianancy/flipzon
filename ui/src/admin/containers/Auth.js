import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux';

import * as classes from './Auth.module.css'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import { login, register } from '../store/actions/AuthActions'

const Auth = (props) => {
    const [activeKey, setActiveKey] = useState("login")
    const login = async (email, password) => {
        await props.login(email, password);
        props.history.push("/admin/dashboard");
    }
    const register = async (userObj) => {
        await props.register(userObj);
        setActiveKey("login")
    }

    let content =  <Login login={login} goToRegister={() => setActiveKey("register")} loading={props.loading} error={props.loginError} />;
    if(activeKey=="register") {
        content = <Register register={register} goToLogin={() => setActiveKey("login")} loading={props.loading} error={props.registerError} />
    }
    return <div className={classes.Container}>
        <Card className={classes.Card}>
            <Card.Header>Flipzon</Card.Header>
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
        loginError: state.adminAuth.loginError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        register: (user) => dispatch(register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)