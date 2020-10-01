import React from 'react';
import { Navbar, Nav,Dropdown,DropdownButton } from 'react-bootstrap'
import {  Link } from 'react-router-dom';

const Header = (props) => {
    return <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand href="#home"><img src={"http://localhost:8080/images/Free_Sample_By_Wix.jpg"} alt="description" width="60px" height="40px"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/productcategories">ProductCategories</Nav.Link>
            <Nav.Link as={Link} to="/admin/products">Product</Nav.Link>
            <Nav.Link as={Link} to="/admin/order">Order</Nav.Link>
        </Nav>
        <DropdownButton alignRight id="dropdown-basic-button" title="My Admin">
            <Dropdown.Item as={Link} to="/admin/profile">Manage Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => props.logout()} href="#">Logout</Dropdown.Item>
        </DropdownButton>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;