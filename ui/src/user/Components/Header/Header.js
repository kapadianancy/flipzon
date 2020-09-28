import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { Navbar, Nav,Form,FormControl,NavDropdown } from 'react-bootstrap'
import {  Link, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import logo from '../../../images/logo-2.jpg';
import cart from '../../../images/shopping-cart.png';
import * as actions from '../../redux-store/Actions/ProductCategoryAction' ;
import './Header.css';

 
class Header extends Component {

    componentDidMount()
    {
        this.props.displaycategory();
    }

    clickHandler=async (event)=>
    {
        event.preventDefault();
        this.props.history.push("/login");
        
        
    }
    render() { 

        this.category=[];
        let i=1;
        this.props.categories.map(c=>
            {
                if(i<=5)
                {
                    this.category.push(
                        <NavDropdown.Item id={c.id}>
                            <Nav.Link as={Link} to={"/product/"+c.id} style={{color:"black"}} exact>{c.name}</Nav.Link>
                    
                        </NavDropdown.Item>
                        );
                        i++;
                        
                }
                return this.category;
            })
        const style={
            header:
            {
                color:"white",
                fontSize:"20px",
                fontWeight:"bold"
            },
            btn:
            {
                backgroundColor:"#fb641b",
                color:"white"
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
                <NavDropdown title="Category"  style={style.header}>
                {this.category}
                <NavDropdown.Item id="0">
                            <Nav.Link as={Link} to="/category" style={{color:"black"}}>View All</Nav.Link>
                            
                        </NavDropdown.Item>
                </NavDropdown>
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
            <br />
            </>
                        
        );
    }
}

const mapStateTOProp=(state)=>
{
    return{
        categories:state.ProductCategory.product_categories
    }
}
const mapStateToActions=(dispatch)=>
{
    return{
        displaycategory:()=>dispatch(actions.fetchProductCategories())
    }
}
 
export default connect(mapStateTOProp,mapStateToActions)(withRouter(Header));