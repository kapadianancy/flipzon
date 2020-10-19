import React, { useEffect,useState } from 'react';

import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import OrdersList from '../components/Order/Order';
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import { fetchOrders } from '../store/actions/OrderAction'
import PrintOrder from '../containers/PrintOrder';
const renderPaginationItems = (total, active, changeActive) => {
    let items = [];
    for(let i=1;i<=total;i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}
const Orders = (props) => {
    const [perPage, setPerPage] = useState(5)
    const [active, setActive] = useState(1)

    useEffect( () => {
        props.fetchOrders(active,perPage)
    }, [props.fetchOrders,active,perPage])
    const changeActive = (index) => {
        setActive(index);
    }
    let myorders = <Spinner animation="border" />;
    if(!props.loading && props.orders) {
        myorders = <OrdersList orders={props.orders} active={(active-1)*perPage}/>
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
               {/* <PrintOrder ordersBill={props.ordersBill}/> */}
            </Card.Body>
            <Card.Footer className={classes.Footer}>
            {
                (props.orders) ?
                <Pagination className={classes.Pagination} >
                    { renderPaginationItems(props.total, active, changeActive) }
                </Pagination> : null
            }
            <Form.Control as="select" value={perPage} custom className={classes.Select} onChange={ (e) => { setActive(1);setPerPage(e.target.value) } }>
                <option>2</option>  
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
            </Form.Control>
            </Card.Footer>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.adminOrdersReducer.orders,
        total: state.adminOrdersReducer.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (page,limit) => dispatch(fetchOrders(page,limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
