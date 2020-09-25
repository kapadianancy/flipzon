import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'

class Order extends Component{
    constructor(props, context) {
		super(props, context);

		this.state = {
			show: false,
		};

		this.handleShow = () => {
			this.setState({ show: true });
		};

		this.handleHide = () => {
			this.setState({ show: false });
		};
	}
    renderProductOrder = (orders) => {
        //   debugger;
        return orders.map((orders, index) => 
            <tr key={"index"+index+1}>
                <td>{index+1}</td>
                <td>{orders.user.username}</td>
                <td>{orders.user.address}</td>
                <td>{orders.user.email}</td>
                <td>{orders.user.contact}</td>
                <td>{orders.totalPrice}</td>
                <td><Button variant="info" onClick={this.handleShow}>View Order</Button></td>
                <td><Button variant="info" onClick={() => this.updateHandler(orders.id)} as={Link} to={`/admin/ProductCategoriesEdit/`}>{orders.status}</Button></td>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Order Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <table>
                                <tr>
                                    <td>
                                        Product Name
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Quantity
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Total Price
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Date
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </table>
                        </p>
                    </Modal.Body>
                </Modal>
            </tr>
            
        )
    }
   
    render(){
        return <Table responsive striped bordered hover size="sm">
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
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         RemoveProductCategories: (id) => dispatch(RemoveProductCategories(id)),
//         SingleProductCategories: (id) => dispatch(SingleProductCategories(id))
//     }
// }

export default connect(null, null)(Order);