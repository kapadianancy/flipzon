import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import {  Route } from 'react-router-dom';

import LoginComponent from '../../Components/Login/Login'
 
class Login extends Component {
    render() { 
        return (
            <div>
               <LoginComponent />
            </div>
        );
    }
}
 
export default Login;