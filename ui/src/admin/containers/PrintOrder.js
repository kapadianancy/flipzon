import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'

import PrintOrderList from '../components/Order/PrintOrderList';
import { fetchOrdersDetails,fetchOrderBill } from '../store/actions/OrderAction';
const PrintOrder = (props) => {
    useEffect( () => {
        // if(props.orderBill.length === 0)
        // {
            props.fetchOrderBill(props.match.params.id);
        // }
            props.fetchOrdersDetails(props.match.params.id);
    }, [props.fetchOrderBill,props.fetchOrdersDetails])
    let data="";
    if(props.ordersDetails)
    {
        data = <PrintOrderList orderBill={props.orderBill} ordersDetails={props.ordersDetails}/>
    }
    return(
        <Card>
            <Card.Body>
                {data}
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        ordersDetails: state.adminOrdersReducer.ordersDetails,
        orderBill:state.adminOrdersReducer.orderBill
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersDetails: (id) => dispatch(fetchOrdersDetails(id)),
        fetchOrderBill:(id) => dispatch(fetchOrderBill(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintOrder);
