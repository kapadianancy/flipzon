import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import { Link, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Dropdown from "react-multilevel-dropdown";

import logo from "../../../images/logo-2.jpg";
import cart from "../../../images/shopping-cart.png";
import * as actions from "../../redux-store/Actions/ProductAction";
import * as Oactions from "../../redux-store/Actions/OrderAction";
import * as cactions from "../../redux-store/Actions/ProductCategoryAction";
import "./Header.css";

class Header extends Component {
  state = {
    dropdownOpen: false,
    setOpen: false,
    cartCount: 0,
  };

  toggle = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        dropdownOpen: !prevState.dropdownOpen,
      };
    });
  };

  view_cart = () => {
    if (this.props.token == "") {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/viewordercart");
    }
  };

  async componentDidMount() {
    //alert("did");
    this.props.displaycategory();

    await this.props.viewCart();
    this.setState({
      cartCount: this.props.orderItems.length,
    });
    this.loadCategory();

  }

  loadCategory()
  {
    this.category = [];
    let i = 1;
    
    this.props.categories.map(async (c) => {
      let sub = [];
      let a = [];
      // if (i <= 5) {
        if (c.parent == c.id) {
          await this.props.fetchMenuSubCat(c.id);
        

          if (this.props.menuSubCat.length != 0) {
            this.props.menuSubCat.map((s) => {
              
              a.push(<Dropdown.Item onClick={()=>{this.props.history.push('/product/'+s.id);}}>
                {s.name}</Dropdown.Item>);

              return this.a;
            });
            sub.push(
              <>
                <DropdownToggle
                  caret
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "0px",
                  }}
                />
                <Dropdown.Submenu>{a}</Dropdown.Submenu>
              </>
            );
          } else {
            sub = [];
            a = [];
          }
          let x=()=>{this.props.history.push('/product/'+c.id)}
          this.category.push(
            
            <Dropdown.Item onClick={sub.length==0?x:null}>
              {c.name}
              {sub.length!=0?sub:null}
              
            </Dropdown.Item>
          );
        }

      //   i++;
      // }
      return this.category;
    });

  }
  
  

  clickHandler = async (event) => {
    event.preventDefault();
    this.props.history.push("/login");
  };

  search = (event) => {
    event.preventDefault();
    //alert(document.getElementById("searchtext").value);
    let text = document.getElementById("searchtext").value;
    this.props.history.push("/searchProduct/" + text);
  };
  render() {
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
      cat: {
        fontSize: "larger",
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: "bold",
        margin: "auto",
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
              <Nav.Link as={Link} to="/vieworder">
                Order History
              </Nav.Link>
            </DropdownItem>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/editprofile">
                Edit Profile
              </Nav.Link>
            </DropdownItem>
            <DropdownItem style={{ padding: "0px" }}>
              <Nav.Link as={Link} to="/changepassword">
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

    let viewcart = (
      <span id="group">
        <img
          src={cart}
          height="40px"
          width="40px"
          style={style.img}
          onClick={this.view_cart}
        />
        <span className="cart-count">{this.state.cartCount}</span>
      </span>
    );

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

            <Nav.Link as={Link} to="/offerproduct" style={style.header}>
              Offers
            </Nav.Link>

            <NavDropdown title="Category" style={style.header}>
              {this.category}
           
              <Dropdown.Item onClick={()=>{this.props.history.push('/category')}}
              >View All</Dropdown.Item>
            </NavDropdown>

            <Form inline>
              <FormControl
                type="text"
                id="searchtext"
                placeholder="Search Product"
                className="mr-sm-2 formControl"
              />
              <Button
                variant="outline-light"
                style={style.btn}
                onClick={this.search}
              >
                Search
              </Button>
            </Form>
          </Nav>

          <Form inline>
            {viewcart}
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
    orderItems: state.Order.orderItems,
    product: state.Product.products,
    error: state.Order.error,
    categories: state.ProductCategory.product_categories,
    token: state.User.token,
    menuSubCat: state.ProductCategory.menuSubCat,
  };
};
const mapStateToActions = (dispatch) => {
  return {
    viewCart: () => dispatch(Oactions.viewCart()),
    getProduct: (pid) => dispatch(actions.productDetails(pid)),
    displaycategory: () => dispatch(actions.fetchProductCategories()),
    fetchMenuSubCat: (id) => dispatch(cactions.fetchMenuSubCat(id)),
  };
};

export default connect(mapStateTOProp, mapStateToActions)(withRouter(Header));
