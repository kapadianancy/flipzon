import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import Header from '../Components/Header/Header';
import Home from '../Containers/Home/Home';
import Category from './Category/Category';
import Login from './Login/Login';
import Footer from '../Components/Footer/Footer';
import {Route} from 'react-router-dom';

 
class HeaderMain  extends Component {
    render() { 
        return (
            <div>
                <Header/>
                <Footer/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/category" exact component={Category}/>
                    <Route path="/login" exact component={Login}/>
                </Switch>
            </div>
        );
    }
}
 
export default HeaderMain;
