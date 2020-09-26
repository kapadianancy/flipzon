import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import OrdersList from '../components/Order/Order';
import { fetchOrders } from '../store/actions/OrderAction'
const Orders = (props) => {
    useEffect( () => {
        if(props.orders.length === 0)
        {
            props.fetchOrders()
        }   
    }, [props])
    return(
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Orders List
                </div>
            </Card.Header>
            <Card.Body>
                <OrdersList orders={props.orders}/>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.adminOrdersReducer.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
