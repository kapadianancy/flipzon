import React, { useState } from 'react';
import { Navbar, Nav,Dropdown,DropdownButton } from 'react-bootstrap'
import {  NavLink, Link } from 'react-router-dom';
import Logo from '../../../images/logo-2.jpg'
import * as classes from './Header.module.css'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

// pencil  	&#x270F; 
// cross  	&#x2A2F; 

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
));

const Header = (props) => {
    const [showing, setShowing] = useState(false);
    let dropDownClasses = [];
    if(showing) dropDownClasses.push(classes.show);

    return <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand className={classes.NavbarBrand} href="#home">
        <Image src={Logo} className={classes.Logo} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/productcategories">Categories</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/products">Products</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/order">Order</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/users">Users</Nav.Link>
        </Nav>

        {
            props.OOSProducts &&
            <Dropdown className={classes.dropdown}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    &#x1F514; <Badge variant="light">{ props.OOSProducts.length }</Badge>
                </Dropdown.Toggle>
                <DropdownMenu className={classes.dropdownMenu} aria-labelledby="dropdown-menu-align-right">
                    {
                        props.OOSProducts.map( product => {
                            return (<div className={classes.notificationTile} key={product.id}>
                                {
                                    product.stock === 0
                                    ? <div className={classes.notificationText}><strong className="text-danger">{product.name}&nbsp;</strong>stock is ended.</div>
                                    : <div className={classes.notificationText}><strong className="text-primary">{product.name}&nbsp;</strong>stock is about to end.</div>
                                }
                                <div className={classes.notificationActions}>
                                    <Button className={classes.notificationEdit} as={Link} to={`/admin/products/edit/${product.id}`}>&#x270F;</Button>
                                    <div className={classes.notificationIgnore} onClick={() => props.removeOOSProduct(product.id)}>&#x2A2F;</div>
                                </div>
                            </div>)
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        }

        <DropdownButton drop="left" id="dropdown-basic-button" title={props.user.username+" "}>
            <Dropdown.Item as={NavLink} to="/admin/profile">Manage Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => props.logout()} href="#">Logout</Dropdown.Item>
        </DropdownButton>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;

{/* <Dropdown>
                <button 
                    id="dropdown-menu-align-right" className="btn" aria-haspopup="true" 
                    aria-expanded="false" type="button" onClick={ () => setShowing(!showing) }
                >&#x1F514; <Badge variant="light">{ props.OOSProducts.length }</Badge></button>
                <DropdownMenu className={dropDownClasses.join(' ')} aria-labelledby="dropdown-menu-align-right">
                    {
                        props.OOSProducts.map( product => {
                            return (<div className={classes.notificationTile} key={product.id}>
                                {
                                    product.stock === 0
                                    ? <div className={classes.notificationText}><strong className="text-danger">{product.name}&nbsp;</strong>stock is ended.</div>
                                    : <div className={classes.notificationText}><strong className="text-primary">{product.name}&nbsp;</strong>stock is about to end.</div>
                                }
                                <div className={classes.notificationActions}>
                                    <Button className={classes.notificationEdit} as={Link} to={`/admin/products/edit/${product.id}`}>&#x270F;</Button>
                                    <div className={classes.notificationIgnore} onClick={() => props.removeOOSProduct(product.id)}>&#x2A2F;</div>
                                </div>
                            </div>)
                        })
                    }
                </DropdownMenu>
            </Dropdown> */}
