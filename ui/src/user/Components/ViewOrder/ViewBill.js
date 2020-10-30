import React, { Component } from "react";

import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import * as actions from "../../redux-store/Actions/OrderAction";
import * as paction from "../../redux-store/Actions/ProductAction";
import * as uactions from "../../redux-store/Actions/UserAction";

class viewBill extends Component {
  state = {
    userid: "",
    username: "",
    email: "",
    address: "",
    contact: "",
    disbale: true,
    visibility: "hidden",
    show: false,
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: ''
  };

  async componentDidMount() {
    this.props.viewCart();
    await this.props.getSingleUser();
    this.setState({
      userid: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      address: this.props.user.address,
      contact: this.props.user.contact,
    });
  }

  placeOrder = async () => {
    await this.props.placeOrder(this.props.orderItems[0].orderId);
    var ask = window.confirm("Your Order Is Placed . check Your email for confirmation");
    if (ask) {
      this.props.history.push('/');
    }
  };

  payment = () => {
    this.setState({
      ...this.state,
      visibility: "visible"
    })
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  radiochange = (event) => {
    if (event.target.value == "COD") {
      this.setState({
        ...this.state,
        disbale: false
      })
    }
    else {
      this.setState({
        ...this.state,
        show: true,
        disbale: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  render() {
    let rows = [];
    let total_price = 0;


    this.props.orderItems.map(async (row) => {
      total_price += row.quantity * row.price;

      rows.push(
        <>
          <table style={{ width: "100%", padding: "5px" }}>

            <tr>
              <td>{row.name}</td>
              <td>qty-{row.quantity}</td>
              <td>{row.quantity * row.price}</td>
            </tr>

            <hr />
          </table>
        </>
      );


      return rows;
    });

    return (
      <>
        <Card
          style={{
            width: "50%",
            padding: "10px",
            margin: "10px",
            display: "inline-block",
            marginRight: "190px",
          }}
        >
          <Card.Body>
            <Card.Title>Personal Information</Card.Title>
            <hr />
            <Card.Text>
              <table style={{ width: "100%", padding: "5px" }}>
                <tr>
                  <th>Name:</th>
                  <td>{this.state.username}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <th>Contact:</th>
                  <td>{this.state.contact}</td>
                </tr>
                <tr>
                  <th>Delivery Address:</th>
                  <td>{this.state.address}</td>
                </tr>
              </table>
            </Card.Text>
            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={this.payment}
            >
              Payment Method
            </Button>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "18rem",
            padding: "10px",
            margin: "10px",
            display: "inline-block",
          }}
        >
          <Card.Body>
            <Card.Title>Order summary</Card.Title>
            <hr />
            <Card.Text>
              {rows}
              <table style={{ width: "100%", padding: "5px" }}>
                <tr>
                  <th>Total amount</th>
                  <th>&#x20B9; {total_price}</th>
                </tr>
              </table>
            </Card.Text>
            <Button
              style={{ width: "100%" }}
              variant="primary"
              disabled={this.state.disbale}
              onClick={this.placeOrder}
            >
              Place Order
            </Button>
          </Card.Body>
        </Card>

        <div style={{ paddingBottom: "20px" }}>
          <Card
            style={{
              visibility: this.state.visibility,
              width: "50%",
              padding: "10px",
              display: "inline-block",
              marginLeft: "-487px"
            }}
          >
            <Card.Body>
              <Card.Title>Select Payment Mathod</Card.Title>
              <Form>
                <div style={{ textAlign: "-webkit-left" }}>
                  <input type="radio" value="COD" name="payment" onChange={this.radiochange} /> COD
               <br />
                  <input type="radio" value="Card" name="payment" onChange={this.radiochange} /> Credit/Debit card

               </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}
          backdrop="static"
          keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Card Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="PaymentForm">
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <form>
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />

              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={this.saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.Order.orderItems,
    product: state.Product.products,
    error: state.Order.error,
    user: state.User.user,
  };
};
const mapStateToAction = (dispatch) => {
  return {
    viewCart: () => dispatch(actions.viewCart()),
    getProduct: (pid) => dispatch(paction.productDetails(pid)),
    placeOrder: (oid) => dispatch(actions.placeOrder(oid)),
    getSingleUser: () => dispatch(uactions.getSingleUser()),
  };
};

export default connect(mapStateToProps, mapStateToAction)(withRouter(viewBill));
