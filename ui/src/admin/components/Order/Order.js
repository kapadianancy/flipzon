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
        return ordersDetails.map((ordersDetails, index) => 
        <Modal.Body scrollable={true}>
            <tr key={"myindex"+index+1}>
                <td>
                    #{index+1}
                <tr>
                    <td>
                        Product Categories
                    </td>
                    <td>
                        {ordersDetails.product.Product_category.name}
                    </td>
                </tr>
                <tr>
                    <td>
                        Product Name
                    </td>
                    <td>
                        {ordersDetails.product.name}
                    </td>
                </tr>
                <tr>
                    <td>
                        Quantity
                    </td>
                    <td>
                        {ordersDetails.quantity}
                    </td>
                </tr>
                <tr>
                    <td>
                        Price 
                    </td>
                    <td>
                        {ordersDetails.price}
                    </td>
                </tr>
                </td>
            </tr>  
            </Modal.Body>
        )
    }
    renderProductOrder = (orders) => { 
        
        let orderData = orders.map((orders, index) => <tr key={"index"+index+1}>
            <td>{index+1}</td>
            <td>{orders.user.username}</td>
            <td>{orders.user.address}</td>
            <td>{orders.user.email}</td>
            <td>{orders.user.contact}</td>
            <td>{orders.totalPrice}</td>
            <td><Button variant="info" onClick={() => this.handleShow(orders.id)}>View Order</Button></td>
            {orders.status === "Completed Delivery" ? <td><Alert variant="success"> {orders.status} </Alert></td> : 

            <td><Alert variant="warning"> <Alert.Link onClick={() => this.updateHandler(orders.id)}>{orders.status}</Alert.Link></Alert></td>
            }
            {/* <Link variant="warning" onClick={() => this.updateHandler(orders.id)}>{orders.status}</Link>             */}
            </tr>  
        )
        return orderData
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
        { this.renderProductOrder(this.props.orders) }     
        </tbody>
        </Table>
        <Modal show={this.state.show}
			onHide={this.handleHide}
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title">
		
        <Table>
            <thead>
				<Modal.Header closeButton>
					<Modal.Title id="example-custom-modal-styling-title">
						Order Details
					</Modal.Title>
				</Modal.Header>	
            </thead>
        <tbody>
            {this.renderOrderDetails(this.props.ordersDetails) }
        </tbody>
        </Table>
        </Modal>
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