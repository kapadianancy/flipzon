import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import './User.css';

import Category from './Containers/Category/Category';
import Product from './Containers/Product/Product';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
<<<<<<< HEAD
import Forgetpassword from './Containers/Forgetpassword/Forgetpassword';
import Signup from './Containers/Signup/Signup';
=======
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

>>>>>>> nancyKapadia
 
class User extends Component {
  render() { 
    return (
      <div style={{textAlign:"center"}}>
       
       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/category" exact component={Category}/>
          <Route path="/product/:cid" exact component={Product}/>
          <Route path="/login" exact component={Login}/>
<<<<<<< HEAD
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/Forgetpassword" exact component={Forgetpassword}/>
=======
          <Route path="/signup" exact component={Signup}/>
>>>>>>> nancyKapadia
      </Switch>
      
      </div>
    );
  }
}
 
export default User;
