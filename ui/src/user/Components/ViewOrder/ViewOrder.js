import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Link, Route, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";

import './ViewOrder.css';

class ViewOrder extends Component {

    render() {
        const styles = {
            table: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop : '20px',
                marginBottom : '40px',
                width: '80%'
            },
        };
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
                        <tr>
                            <td>30-09-2020</td>
                            <td>10000</td>
                            <td>
                                <button type="button" class="btn btn-success btn-circle btn-md">Confirm</button>
                            </td>
                            <td>
                                <Nav.Link as={Link} className="forgot-link"  to="/signup">Order Details</Nav.Link>
                            </td>
                        </tr>
                        <tr>
                            <td>01-09-2020</td>
                            <td>25000</td>
                            <td>
                                <button type="button" class="btn btn-danger btn-circle btn-md">Cancel</button>
                            </td>
                            <td>
                                <Nav.Link as={Link} className="forgot-link"  to="/signup">Order Details</Nav.Link>
                            </td>
                        </tr>
                        <tr>
                            <td>01-10-2020</td>
                            <td>125000</td>
                            <td>
                                <button type="button" class="btn btn-warning btn-circle btn-md">Pending</button>
                            </td>
                            <td>
                                <Nav.Link as={Link} className="forgot-link"  to="/signup">Order Details</Nav.Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}
export default withRouter(ViewOrder);