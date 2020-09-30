import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { fetchOrdersDetails,updateOrders } from '../../store/actions/OrderAction'

class Order extends Component{
	state = {
		show: false,
	};

	handleShow = async (id) => {
		await this.props.fetchOrdersDetails(id);
		this.setState({ show: true });
	};

    updateHandler = async (id) => {
        await this.props.updateOrders(id);
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
            </tr>        
            <tr>
                <th>
                    Product Categories :- 
                </th>
                <td>
                    {ordersDetails.product.Product_category.name}
                </td>
            </tr>
            <tr>
                <th>
                    Product Name :- 
                </th>
                <td>
                    {ordersDetails.product.name}
                </td>
            </tr>
            <tr>
                <th>
                    Quantity :- 
                </th>
                <td>
                    {ordersDetails.quantity}
                </td>
            </tr>
            <tr>
                <th>
                    Price :- 
                </th>
                <td>
                    {ordersDetails.price}
                </td>
            </tr>
            <hr></hr>
            </tbody>
        )
    }
    renderProductOrder = (orders, activeOld, perPage) => {
            let ordersArr = [];
            let active = (activeOld-1)*perPage;
            for(let i=active;i<(activeOld*perPage);i++) {
                if(orders[i]) {
                    ordersArr.push(
                        <tr key={orders[i].id}>
                            <td>{i+1}</td>
                            <td>{orders[i].user.username}</td>
                            <td>{orders[i].user.address}</td>
                            <td>{orders[i].user.email}</td>
                            <td>{orders[i].user.contact}</td>
                            <td>{orders[i].totalPrice}</td>
                            <td><Button variant="info" onClick={() => this.handleShow(orders[i].id)}>View Order</Button></td>
                            {orders[i].status === "Completed Delivery" ? <td><Alert variant="success"> {orders[i].status} </Alert></td> : 

                            <td><Alert variant="warning"> <Alert.Link onClick={() => this.updateHandler(orders[i].id)}>{orders[i].status}</Alert.Link></Alert></td>
                            }
                        </tr>
                    )
                }
            }
            return ordersArr;
        }
    
    render(){
        return <div>
        <Table responsive striped bordered hover size="sm">
        <thead>
        <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Email ID</th>
                <th>Contact No</th>
                <th>Total Price</th>
                <th>Order</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
        { this.renderProductOrder(this.props.orders, this.props.active, this.props.perPage) }     
        </tbody>
        </Table>
       
        <Table>
            <thead>
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
                    {this.renderOrderDetails(this.props.ordersDetails) }
                </Modal.Body>
            </Modal>
            </thead>
        </Table>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        loading: state.adminOrdersReducer.loading,
        ordersDetails: state.adminOrdersReducer.ordersDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersDetails: (id) => dispatch(fetchOrdersDetails(id)),
        updateOrders:(id)=>dispatch(updateOrders(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);