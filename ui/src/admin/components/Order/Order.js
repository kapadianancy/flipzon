import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';
import Modal from 'react-bootstrap/Modal'
import { fetchOrdersDetails } from '../../store/actions/OrderAction'

class Order extends Component{
	state = {
		show: false,
	};

	handleShow = async (id) => {
		await this.props.fetchOrdersDetails(id);
		this.setState({ show: true });
	};

	handleHide = () => {
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
        return orders.map((orders, index) => <tr key={"index"+index+1}>
                <td>{index+1}</td>
                <td>{orders.user.username}</td>
                <td>{orders.user.address}</td>
                <td>{orders.user.email}</td>
                <td>{orders.user.contact}</td>
                <td>{orders.totalPrice}</td>
                <td><Button variant="info" onClick={() => this.handleShow(orders.id)}>View Order</Button></td>
                <td><Button variant="info" onClick={() => this.updateHandler(orders.id)} as={Link} to={`/admin/ProductCategoriesEdit/`}>{orders.status}</Button></td>
            </tr>  
        )
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
            { this.renderProductOrder(this.props.orders)}  
            
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
            {this.renderOrderDetails(this.props.ordersDetails)}
        </tbody>
        </Table>
        </Modal>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        ordersDetails: state.adminOrdersReducer.ordersDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersDetails: (id) => dispatch(fetchOrdersDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);