import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import {  Route } from 'react-router-dom';

import LoginComponent from '../../Components/Login/Login'
 
class Login extends Component {
    render() { 
        return (
            <div>
                <Header />
               <LoginComponent />
               <Footer />
            </div>
        );
    }
}
 
export default Login;