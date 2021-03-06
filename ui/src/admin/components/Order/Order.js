import React , {Component } from 'react';

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import { fetchOrdersDetails,updateOrders,fetchOrders,fetchOrderBill } from '../../store/actions/OrderAction'
import { FaPrint,FaRegEye } from "react-icons/fa";
import PrintOrder from '../../containers/PrintOrder';
class Order extends Component{
	state = {
        show: false,
        print:false
	};

	handleShow = async (id) => {
        this.setState({print:false})
		await this.props.fetchOrdersDetails(id);
		this.setState({ show: true });
	};

    updateHandler = async (id,status) => {
        await this.props.updateOrders(id,status);
        // await this.props.fetchOrders(1,5);  
	};
	handleHide = (id) => {
		this.setState({ show: false });
	};
    renderOrderDetails = (ordersDetails) => { 
        return ordersDetails.map((ordersDetails, index) => <tbody key={"index0"+index}>
            <tr>
                <th>
                    #{index+1}
                </th>
                <th>
                </th>
            </tr>        
            <tr>
                <th>
                    Categories 
                </th>
                <td>
                    {ordersDetails.product.Product_category.name}
                </td>
            </tr>
            <tr>
                <th>
                    Product 
                </th>
                <td>
                    {ordersDetails.product.name}
                </td>
            </tr>
            <tr>
                <th>
                    Quantity 
                </th>
                <td>
                    {ordersDetails.quantity}
                </td>
            </tr>
            <tr>
                <th>
                    Price 
                </th>
                <td>
                    {ordersDetails.price}
                </td>
            </tr>
            </tbody>
        )
    }
    printOrders = async (id) => {
        await this.props.fetchOrderBill(id);
        this.setState({print:true})
    }
    renderProductOrder = (orders, active) => {
            return orders.map((orders, i) => 
                <tr key={orders.id}>
                    <td>{i+1+active}</td>
                    <td>{orders.user.username}</td>
                    <td>{orders.user.address}</td>
                    <td>{orders.user.email}</td>
                    <td>{orders.user.contact}</td>
                    <td>{orders.totalPrice}</td>
                    <td>{new Date(orders.orderDate).toLocaleDateString()}</td>
                    <td>{orders.mode}</td>
                    {
                        orders.status === "Delivered" ? <td><Alert variant="success"> {orders.status} </Alert></td> :
                        orders.status === "Canceled" ? <td><Alert variant="danger"> {orders.status} </Alert></td> : 
                    <td><Alert variant="info"> <Alert.Link onClick={() => this.updateHandler(orders.id,"Delivered")}>{orders.status}</Alert.Link></Alert></td>
                    }
                    <td><Button variant="outline-primary" onClick={() => this.handleShow(orders.id)}><FaRegEye/></Button></td>
                    <td><Button variant="info" onClick={()=>this.printOrders(orders.id)}><FaPrint/></Button></td>
                </tr>
            )
        }
        onSortString(event, sortKey,d){
            const data = this.props.orders;
            if(d==='a')
            {
                data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
                this.setState({direction:'decending'})
            }
            else
            {
                data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
                this.setState({direction:'acending'})
            }
        }
        onSortNumber(event, sortKey,d){
            const data = this.props.orders
            if(d==='a')
            {
                data.sort((a,b) => a[sortKey] - b[sortKey])
                this.setState({direction:'decending'})
            }
            else
            {
                data.sort((a,b) => b[sortKey] - a[sortKey])
                this.setState({direction:'acending'})
            }
        }
        onSortDate(event, sortKey,d){
            const data = this.props.orders;
            if(d==='a')
            {
                data.sort((a,b) => new Date(a[sortKey]) - new Date(b[sortKey]))
                this.setState({direction:'decending'})
            }
            else
            {
                data.sort((a,b) => new Date(b[sortKey]) - new Date(a[sortKey]))
                this.setState({direction:'acending'})
            }
        }
    render(){
        return <>
        <Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Name <span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','b')}>&#8595;</span> </th>
                <th>Address <span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','b')}>&#8595;</span> </th>
                <th>Email <span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','b')}>&#8595;</span></th>
                <th>Contact <span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'userId','b')}>&#8595;</span></th>
                <th>Total <span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'totalPrice','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortNumber(e, 'totalPrice','b')}>&#8595;</span></th>
                <th>OrderDate <span style={{cursor: "pointer"}} onClick={e => this.onSortDate(e, 'orderDate','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortDate(e, 'orderDate','b')}>&#8595;</span></th>
                <th>PaymentMode <span style={{cursor: "pointer"}} onClick={e => this.onSortString(e, 'mode','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortString(e, 'mode','b')}>&#8595;</span></th>
                <th>Status <span style={{cursor: "pointer"}} onClick={e => this.onSortString(e, 'status','a')}>&#8593;</span><span style={{cursor: "pointer"}} onClick={e => this.onSortString(e, 'status','b')}>&#8595;</span></th>
                <th>Order</th>
                <th>Bill</th>
            </tr>
        </thead>
        <tbody>
        { (this.props.orders.length>0) ? this.renderProductOrder(this.props.orders, this.props.active) : ""}     
        </tbody>
        </Table>    
            <Modal show={this.state.show}
                onHide={this.handleHide}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Order Details
                    </Modal.Title>
                </Modal.Header>	
                <Modal.Body key={"mindex"} scrollable={"true"}>
                    <Table responsive striped bordered hover size="sm">
                        {(this.props.ordersDetails)?this.renderOrderDetails(this.props.ordersDetails):"" }
                    </Table>
                </Modal.Body>
            </Modal>
            {(this.props.orderBill.length>0)?<PrintOrder ordersBill={this.props.orderBill} print={this.state.print}/>:""}
        </>
    }
}

const mapStateToProps = state => {
    return {
        loading: state.adminOrdersReducer.loading,
        ordersDetails: state.adminOrdersReducer.ordersDetails,
        orderBill:state.adminOrdersReducer.orderBill
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersDetails: (id) => dispatch(fetchOrdersDetails(id)),
        updateOrders:(id,status)=>dispatch(updateOrders(id,status)),
        fetchOrders:(page,limit)=>dispatch(fetchOrders(page,limit)),
        fetchOrderBill:(id)=>dispatch(fetchOrderBill(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);