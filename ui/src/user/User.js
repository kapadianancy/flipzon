import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import './User.css';

import Category from './Containers/Category/Category';
import Product from './Containers/Product/Product';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
<<<<<<< HEAD
import Signup from './Containers/Signup/Signup';
import Forgetpassword from './Containers/Forgetpassword/Forgetpassword';
import Error from './Components/error';
=======
import Signup from './Components/Signup/Signup';
>>>>>>> 9e6f0cfd97487486a1c4560e983b2cce1c050a12
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

 
class User extends Component {
  render() { 
    return (
      <div style={{textAlign:"center"}}>
       
       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/category" exact component={Category}/>
          <Route path="/product/:cid" exact component={Product}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
<<<<<<< HEAD
          <Route path="/error/:error" exact component={Error}/>
          <Route path="/forgetpassword" exact component={Forgetpassword}/>
=======
>>>>>>> 9e6f0cfd97487486a1c4560e983b2cce1c050a12
      </Switch>
      
      </div>
    );
  }
}
 
export default User;
