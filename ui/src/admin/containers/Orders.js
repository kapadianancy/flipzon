import React, { useEffect,useState } from 'react';

import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import OrdersList from '../components/Order/Order';
import Pagination from 'react-bootstrap/Pagination'
import { fetchOrders } from '../store/actions/OrderAction'
const renderPaginationItems = (total, active, limit, changeActive) => {
    let items = [];
    for(let i=1;i<=Math.ceil(total/limit);i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}
const Orders = (props) => {
    const perPage = 5;
    const [active, setActive] = useState(1)
    useEffect( () => {
        if(props.orders.length === 0)
        {
            props.fetchOrders()
        }   
    }, [props])
    const changeActive = (index) => {
        setActive(index);
    }
    let myorders = "Loading";
    if(props.orders.length > 0) {
        myorders = [
            <OrdersList key={1} orders={props.orders} active={active} perPage={perPage}/>,
            <Pagination key={2} >
                { renderPaginationItems(props.orders.length, active, perPage, changeActive) }
            </Pagination>
        ]
    }
    return(
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Orders List
                </div>
            </Card.Header>
            <Card.Body>
               {myorders}
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
