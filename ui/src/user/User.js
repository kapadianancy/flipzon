import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import './User.css';

import Category from './Containers/Category/Category';
import Product from './Containers/Product/Product';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Signup from './Containers/Signup/Signup';
import Forgetpassword from './Containers/Forgetpassword/Forgetpassword';
import EditProfile from './Containers/EditProfile/EditProfile';
import ChangePassword from './Containers/ChangePassword/ChangePassword';
import UpdatePassword from './Containers/Forgetpassword/UpdatePassword';
import ViewOrder from './Containers/ViewOrder/ViewOrder';
import Error from './Components/error';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Logout from './Components/Logout';
import ProductDetails from './Containers/Product/ProductDetails';
import OfferProduct from './Containers/Product/OfferProduct';
import ViewOrderCart from './Containers/ViewOrder/ViewOrderCart';
import ViewBill from './Containers/ViewOrder/ViewBill';
import ViewOrderDetails from './Containers/ViewOrder/ViewOrderDetails';
import searchProduct from './Containers/Product/searchProduct';
 
class User extends Component {
  render() { 
    return (
      <div style={{textAlign:"center"}}>
       
       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/category" exact component={Category}/>
          <Route path="/product/:cid" exact component={Product}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/searchProduct/:text" exact component={searchProduct}/>
          <Route path="/error/:error" exact component={Error}/>
          <Route path="/forgetpassword" exact component={Forgetpassword}/>
          <Route path="/updatepassword/:uid" exact component={UpdatePassword}/>
          <Route path="/editprofile" exact component={EditProfile}/>
          <Route path="/changepassword" exact component={ChangePassword}/>
          <Route path="/vieworder" exact component={ViewOrder}/>
          <Route path="/offerproduct" exact component={OfferProduct}/>
          <Route path="/productDetails/:pid" exact component={ProductDetails}/>
          <Route path="/viewordercart" exact component={ViewOrderCart}/>
          <Route path="/viewbill" exact component={ViewBill}/>
          <Route path="/vieworderdetails/:oid" exact component={ViewOrderDetails}/>
   </Switch>
      
      </div>
    );
  }
}
 
export default User;
