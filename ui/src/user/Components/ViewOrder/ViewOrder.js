import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Link, Route, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { connect } from 'react-redux'

import * as actions from '../../redux-store/Actions/UserAction';
import * as oaction from '../../redux-store/Actions/OrderAction';
import './ViewOrder.css';

class ViewOrder extends Component {



    componentDidMount() {
        this.props.viewOrder();
    }

    cancelOrder=async(oid)=>
    {
        alert(oid);
        await this.props.cancelOrder(oid);
        this.props.viewOrder();
    }

    render() {

        const styles = {
            table: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                marginBottom: '40px',
                width: '80%'
            },cardBtn: {
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: '10px',
                color: "white"
            }
        };
      
            

        let data = [];
        if (!this.props.orders) {
            data.push(
                <tr>
                    <td colSpan="4">
                        <div style={{ margin: 'auto', color: '#fb641b', marginBottom: '100px', marginTop: '50px' }}>
                            <h1><center>No Orders Yet</center></h1>
                        </div>
                    </td>
                </tr>
            )
        }
        else {
            let btn = null;
            let details=null;
            this.props.orders.map(o => {
                let status = "";
                if (o.status == "Confirm") {
                    status = "btn btn-success btn-circle btn-md";
                    btn = null;
                    details=(
                        <Nav.Link as={Link} className="forgot-link" to={"/vieworderdetails/" + o.id}>Order Details</Nav.Link>
                    );
                }

                else if (o.status == "Cancel") {
                    status = "btn btn-danger btn-circle btn-md";
                    btn = null;
                    details="---";
                }

                else {
                    status = "btn btn-warning btn-circle btn-md";
                    btn = (
                        <button type="button" style={styles.cardBtn} onClick={() => this.cancelOrder(o.id)}>X</button>
                    );
                    details=null;
                }

                data.push(

                    <tr>
                        <td>{o.orderDate}</td>
                        <td>{o.totalPrice}</td>

                        <td>
                            <button type="button" class={status}>{o.status}</button>
                        </td>
                        <td>
                            
                            {btn}
                            {details}
                        </td>
                    </tr>
                );
                return data;
            })
        }




        return (
            <>
                <h2>View Orders</h2>
                <Table striped borderless responsive style={styles.table}>

                    <thead>
                        <tr>
                            <th>Order date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>View Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}

                    </tbody>
                </Table>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.User.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewOrder: () => dispatch(actions.viewOrder()),
        cancelOrder:(oid)=>dispatch(oaction.cancelOrder(oid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewOrder));