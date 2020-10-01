import React from 'react';
import Table from 'react-bootstrap/Table'

const renderOrders = (orders, activeOld, perPage) => {
    let ordersArr = [];
    let active = (activeOld-1)*perPage;
    for(let i=active;i<(activeOld*perPage);i++) {
        if(orders[i]) {
            ordersArr.push(
                <tr key={orders[i].id}>
                    <td>{i+1}</td>
                    <td>{orders[i].id}</td>
                    <td>{orders[i].orderDate}</td>
                    <td>{orders[i].totalPrice}</td>
                    <td>{orders[i].status}</td>
                </tr>
            )
        }
    }
    return ordersArr;
}

const OrdersList = (props) => {
    return <Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Order Price</th>
                <th>Order Status</th>
            </tr>
        </thead>
        <tbody>
            { renderOrders(props.orders, 1, 10) }
        </tbody>
    </Table>
}

export default OrdersList