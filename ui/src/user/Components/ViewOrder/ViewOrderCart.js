import React, { Component } from "react";
import { connect } from "react-redux";
import {Table } from "reactstrap";
import {Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import NumericInput from "react-numeric-input";

import * as actions from "../../redux-store/Actions/OrderAction";
import * as paction from "../../redux-store/Actions/ProductAction";
import * as uaction from '../../redux-store/Actions/UserAction';
import "./ViewOrder.css";
class ViewOrderCart extends Component {

    state={
        show:false,
        address:""
    }
  componentDidMount() {
    this.props.viewCart();
  }

  addressChange=(event)=>
  {
      this.setState({
          address:event.target.value
      })
  }

  placeOrder = async () => {
    if (this.props.token == "") {
      this.props.history.push("/login");
    } else {
      
      await this.props.getUser();
      this.setState({
          show:true,
          address:this.props.user.address
      })
    }
  };

  removeItem = async (oid) => {
    // alert(oid);
    await this.props.removeOrderItem(oid);
    this.props.viewCart();
    window.location.reload(true);
  };

  handleChange =async (event,oid,pid) => {

    //Change Quantity
    const order ={
      "id" : oid,
      "productId" : pid,
      "quantity" : event
    }
    await this.props.updateOrder(order);
    this.props.viewCart();



  };

  handleClose=()=>
  {
      this.setState({
          show:false
      })
  }

  saveChanges=async ()=>
  {
    const CurrentUser = {
        ...this.state,
        address: this.state.address
        
    }
    await this.props.editprofile(CurrentUser);
      this.handleClose();
      this.props.history.push('viewbill');
      
  }

  render() {
    const styles = {
      cardBtn: {
        backgroundColor: "#fb641b",
        borderColor: "#fb641b",
        margin: "10px",
        color: "white",
      },
      btn: {
        alignSelf: "center",
        backgroundColor: "#fb641b",
        borderColor: "#fb641b",
        margin: "10px",
        color: "white",
        width: "170px",
        height: "50px",
        borderRadius: "10px",
      },
      table: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        width: "80%",
      },
    };

    let rows = [];

    this.props.orderItems.map((row) => {
      rows.push(
        <tr>
          <td>
            <img
              src={`http://localhost:8080${row.main_image}`}
              height="50px"
              width="50px"
            />
          </td>
          <td>{row.name}</td>
          <td>{row.price}</td>
          <td>
            <div style={{marginLeft:"70px"}}>
          <NumericInput
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  max={row.stock}
                  value={row.quantity}
                  step={1}
                  precision={0}
                  size={5}
                  mobile
                  onChange={(event) => this.handleChange(event,row.id,row.productId)}
                />
                </div>
          </td>
          <td>{row.price * row.quantity}</td>
          <td>
            <button
              type="button"
              style={styles.cardBtn}
              onClick={() => this.removeItem(row.id)}
            >
              X
            </button>
          </td>
        </tr>
      );

      return rows;
    });

    return (
      <>
        <h2>View Orders Cart</h2>
        <Table striped border responsive style={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <button type="button" style={styles.btn} onClick={this.placeOrder}>
          Checkout
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}
        backdrop="static"
        keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delivery Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <textarea name="address" cols="60" rows="5"
              value={this.state.address} onChange={this.addressChange}/>
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
    token: state.User.token,
    user:state.User.user
  };
};
const mapStateToAction = (dispatch) => {
  return {
    viewCart: () => dispatch(actions.viewCart()),
    getProduct: (pid) => dispatch(paction.productDetails(pid)),
    placeOrder: (oid) => dispatch(actions.placeOrder(oid)),
    removeOrderItem: (oid) => dispatch(actions.removeOrderItem(oid)),
    updateOrder: (order) => dispatch(actions.updateOrder(order)),
    getUser:()=>dispatch(uaction.getSingleUser()),
    editprofile:(CurrentUser) => dispatch(uaction.editprofile(CurrentUser))
  };
};

export default connect(
  mapStateToProps,
  mapStateToAction
)(withRouter(ViewOrderCart));
