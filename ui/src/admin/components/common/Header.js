import React from 'react';
import { Navbar, Nav,Dropdown,DropdownButton } from 'react-bootstrap'
import {  NavLink } from 'react-router-dom';
import Logo from '../../../images/logo-2.jpg'
import * as classes from './Header.module.css'
import Image from 'react-bootstrap/Image'

const Header = (props) => {
    return <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand className={classes.NavbarBrand} href="#home">
        <Image src={Logo} className={classes.Logo} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/product_categories">Categories</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/products">Products</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/order">Order</Nav.Link>
            <Nav.Link as={NavLink} activeClassName={classes.Active} to="/admin/users">Users</Nav.Link>
        </Nav>
        <DropdownButton alignRight id="dropdown-basic-button" title={props.user.username+" "}>
            <Dropdown.Item as={NavLink} to="/admin/profile">Manage Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => props.logout()} href="#">Logout</Dropdown.Item>
        </DropdownButton>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;