import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { Navbar, Nav,Form,FormControl } from 'react-bootstrap'
import {  Link, Route, withRouter } from 'react-router-dom';
import logo from '../../../images/logo-2.jpg';
import cart from '../../../images/shopping-cart.png';

import './Header.css';

 
class Header extends Component {
    clickHandler=(event)=>
    {
        event.preventDefault();
        this.props.history.push("/login");
    }
    render() { 
        const style={
            header:
            {
                color:"white",
                fontSize:"20px",
                fontWeight:"bold"
            },
            btn:
            {
                backgroundColor:"#ffe500",
                color:"black"
            },
            img:
            {
                marginRight:"20px"
            }
        }
        return (
            <>
            
            <Navbar bg="primary" variant="dark" sticky="top" >
                <Navbar.Brand><img src={logo}
                 height="70px" width="100px"></img></Navbar.Brand>
                <Nav className="mr-auto" >
                <Nav.Link as={Link} to="/" style={style.header}>Home</Nav.Link>
                <Nav.Link as={Link} to="/category"  style={style.header}>Category</Nav.Link>
                <Form inline>
                <FormControl type="text" placeholder="Search Product" className="mr-sm-2 formControl"/>
                <Button variant="outline-light" style={style.btn}>Search</Button>
                </Form>
                </Nav>

                <Form inline>
                    
                <img src={cart} height="40px" width="40px" style={style.img}></img>
                <Button variant="outline-light" style={style.btn} onClick={this.clickHandler}>
                    Login/Signup
                    </Button>
                </Form>
                
            </Navbar>
            </>
                        
        );
    }
}
 
export default withRouter(Header);