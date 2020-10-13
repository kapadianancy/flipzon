import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import * as actions from '../../redux-store/Actions/OrderAction';
import * as paction from '../../redux-store/Actions/ProductAction';
import './ViewOrder.css';
class ViewOrderCart extends Component {

   componentDidMount(){
       this.props.viewCart();
   }

    componentDidUpdate() {
        this.props.viewCart();
    }


    placeOrder = async () => {
        if(this.props.token=="")
        {
            this.props.history.push('/login');
        }
        else
        {
            this.props.history.push('viewbill');
        }
      
    }

    removeItem = async (oid)=> {
       // alert(oid);
       await this.props.removeOrderItem(oid);
       this.props.viewCart();
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

    
        this.props.orderItems.map(async (row) => {

            rows.push(
                <tr>
                    <td><img src={`http://localhost:8080${row.main_image}`} height="50px" width="50px" /></td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.quantity}</td>
                    <td>{row.price * row.quantity}</td>
                    <td>
                        <button type="button" style={styles.cardBtn} onClick={()=>this.removeItem(row.id)}>X</button>
                    </td>

                </tr>
            )

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
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <button type="button" style={styles.btn}
                    onClick={this.placeOrder}>Checkout</button>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderItems: state.Order.orderItems,
        product: state.Product.products,
        error: state.Order.error,
        token:state.User.token
    }

}
const mapStateToAction = (dispatch) => {

    return {
        viewCart: () => dispatch(actions.viewCart()),
        getProduct: (pid) => dispatch(paction.productDetails(pid)),
        placeOrder: (oid) => dispatch(actions.placeOrder(oid)),
        removeOrderItem: (oid) => dispatch(actions.removeOrderItem(oid))
    }
}

export default connect(mapStateToProps, mapStateToAction)(withRouter(ViewOrderCart));

