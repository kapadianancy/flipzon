import React from 'react';
import { Navbar, Nav,Dropdown,DropdownButton,NavDropdown } from 'react-bootstrap'
import {  Link } from 'react-router-dom';

const Header = (props) => {
    return <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Brand href="#home">Flipzon</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            {/* <Nav.Link href="#ProductCategories">Product Categories</Nav.Link> */}
            <NavDropdown title="Product Categories" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#ViewProductCategories">View ProductCategories</NavDropdown.Item>
                <NavDropdown.Item href="#AddProductCategories">Add ProductCategories</NavDropdown.Item>
                <NavDropdown.Item href="#UpdateProductCategories">Update ProductCategories</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/admin/products">Product</Nav.Link>
        </Nav>
        <DropdownButton alignRight id="dropdown-basic-button" title="My Admin">
            <Dropdown.Item href="#/EditProfile">Edit Profile</Dropdown.Item>
            <Dropdown.Item href="#/ChangePassword">ChangePassword</Dropdown.Item>
            <Dropdown.Item href="#/Logout">Logout</Dropdown.Item>
        </DropdownButton>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;