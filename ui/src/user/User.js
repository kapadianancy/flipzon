import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import './User.css';

import Category from './Containers/Category/Category';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Forgetpassword from './Containers/Forgetpassword/Forgetpassword';
import Signup from './Containers/Signup/Signup';
 
class User extends Component {
  render() { 
    return (
      <div style={{textAlign:"center"}}>
       

       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/category" exact component={Category}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/Forgetpassword" exact component={Forgetpassword}/>
      </Switch>
      
      </div>
    );
  }
}
 
export default User;
