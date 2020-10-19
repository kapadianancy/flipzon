import React, { Component } from "react";

import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

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
    visibility:"hidden"
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
    alert("Your Order Is Placed . check Your email for confirmation");
  };

  payment=()=>
  {
      this.setState({
          ...this.state,
          visibility:"visible"
      })
  }

  radiochange=(event)=>
  {
      if(event.target.value=="COD")
      {
          this.setState({
              ...this.state,
              disbale:false
          })
      }
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
                  <th>Customer name:</th>
                  <td>{this.state.username}</td>
                </tr>
                <tr>
                  <th>Customer email:</th>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <th>Customer contact:</th>
                  <td>{this.state.contact}</td>
                </tr>
                <tr>
                  <th>delivery address:</th>
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

        <div>
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
              <Card.Title>select Payment Mathod</Card.Title>
              <Form>
                  <div style={{textAlign: "-webkit-left"}}>
               <input type="radio" value="COD" name="payment" onChange={this.radiochange}/> COD
               <br/>
               <input type="radio" value="Card" name="payment"/> Credit/Debit card
               <br/>
               <input type="radio" value="Net" name="payment"/> Net Banking
               <br/>
               <input type="radio" value="upi" name="payment"/> UPI
               <br/>
               <input type="radio" value="wallet" name="payment"/> Wallet
               </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
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
