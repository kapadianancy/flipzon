import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import logo from "../../../images/logo-2.jpg";
import cart from "../../../images/shopping-cart.png";
import * as actions from "../../redux-store/Actions/ProductAction";
import "./Header.css";

class Header extends Component {
  state = {
    dropdownOpen: false,
    setOpen: false,
  };

  toggle = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        dropdownOpen: !prevState.dropdownOpen,
      };
    });
  };

  componentDidMount() {
    this.props.displaycategory();
  }

  clickHandler = async (event) => {
    event.preventDefault();
    this.props.history.push("/login");
  };
  render() {
    this.category = [];
    let i = 1;
    this.props.categories.map((c) => {
      if (i <= 5) {
        this.category.push(
          <NavDropdown.Item id={c.id}>
            <Nav.Link
              as={Link}
              to={"/product/" + c.id}
              style={{ color: "black" }}
              exact
            >
              {c.name}
            </Nav.Link>
          </NavDropdown.Item>
        );
        i++;
      }
      return this.category;
    });
    const style = {
      header: {
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
      },
      btn: {
        backgroundColor: "#fb641b",
        color: "white",
      },
      img: {
        marginRight: "20px",
      },
    };

    let loginBtn = null;
    if (this.props.token == "") {
      loginBtn = (
        <Button
          variant="outline-light"
          style={style.btn}
          onClick={this.clickHandler}
        >
          Login/Signup
        </Button>
      );
    } else {
      loginBtn = (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            caret
            style={{ backgroundColor: "#fb641b", color: "white" }}
          >
            Your Account
          </DropdownToggle>
          <DropdownMenu style={{ minWidth: "148px", right: "10px" }}>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/">
                Order History
              </Nav.Link>
            </DropdownItem>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/">
                Edit Profile
              </Nav.Link>
            </DropdownItem>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/">
                Change Password
              </Nav.Link>
            </DropdownItem>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      );
    }
    return (
      <>
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand>
            <img src={logo} height="70px" width="100px"></img>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" style={style.header}>
              Home
            </Nav.Link>
            <NavDropdown title="Category" style={style.header}>
              {this.category}
              <NavDropdown.Item id="0">
                <Nav.Link as={Link} to="/category" style={{ color: "black" }}>
                  View All
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search Product"
                className="mr-sm-2 formControl"
              />
              <Button variant="outline-light" style={style.btn}>
                Search
              </Button>
            </Form>
          </Nav>

          <Form inline>
            <img src={cart} height="40px" width="40px" style={style.img}></img>
            {loginBtn}
          </Form>
        </Navbar>
        <br />
      </>
    );
  }
}

const mapStateTOProp = (state) => {
  return {
    categories: state.ProductCategory.product_categories,
    token: state.User.token,
  };
};
const mapStateToActions = (dispatch) => {
  return {
    displaycategory: () => dispatch(actions.fetchProductCategories()),
  };
};

export default connect(mapStateTOProp, mapStateToActions)(withRouter(Header));
