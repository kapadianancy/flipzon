import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import * as actions from '../../redux-store/Actions/OrderAction';
import * as paction from '../../redux-store/Actions/ProductAction';
import './ViewOrder.css';
class ViewOrderDetails extends Component {

    componentDidMount() {
        this.props.viewOrderDetails(this.props.match.params.oid);
    }

    componentDidUpdate() {
        this.props.viewOrderDetails(this.props.match.params.oid);
    }


    render() {


        const styles = {
            cardBtn: {
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: '10px',
                color: "white"
            },
            btn: {
                alignSelf: 'center',
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: '10px',
                color: "white",
                width: '170px',
                height: "50px",
                borderRadius: "10px"
            },
            table: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                marginBottom: '20px',
                width: '80%',

            },
        };

        let rows = [];

        if (this.props.orderItems.length == 0) {
            rows.push(<tr>
                <td colSpan="6">
                    <div style={{ margin: 'auto', color: '#fb641b' }}>
                        <h1><center>Your Flipzon Basket is empty</center></h1>
                    </div>
                </td>
            </tr>)
        }
        this.props.orderItems.map(async (row) => {

            rows.push(
                <tr>
                    <td><img src={`http://localhost:8080${row.main_image}`} height="50px" width="50px" /></td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.quantity}</td>
                    <td>{row.price * row.quantity}</td>
                    
                </tr>
            )

            return rows;
        });

        return (
            <>
                
                <Table striped border responsive style={styles.table}>

                    <thead>
                        <tr>
                            <th></th>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderItems: state.Order.orderItems,
        product: state.Product.products,
        error: state.Order.error
    }

}
const mapStateToAction = (dispatch) => {

    return {
        viewOrderDetails:(oid)=>dispatch(actions.viewOrderDetails(oid)),
        getProduct: (pid) => dispatch(paction.productDetails(pid))
        
    }
}

export default connect(mapStateToProps, mapStateToAction)(withRouter(ViewOrderDetails));

