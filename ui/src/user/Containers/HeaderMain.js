import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import Header from '../Components/Header/Header';
import Home from '../Containers/Home/Home';
import Category from './Category/Category';
import Login from './Login/Login';
<<<<<<< HEAD
import Forgetpassword from './Forgetpassword/Forgetpassword';
import Signup from './Signup/Signup';
=======
import Footer from '../Components/Footer/Footer';
>>>>>>> nancyKapadia
import {Route} from 'react-router-dom';

 
class HeaderMain  extends Component {
    render() { 
        return (
            <div>
<<<<<<< HEAD
                <Header/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/category" exact component={Category}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/forgetPassword" exact component={Forgetpassword}/>
                    <Route path="/signup" exact component={Signup}/>
                </Switch>
=======
               
                
>>>>>>> nancyKapadia
            </div>
        );
    }
}
 
export default HeaderMain;
