import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { fetchOrdersDetails,updateOrders } from '../../store/actions/OrderAction'
import { Link } from 'react-router-dom';
// import ReactToPrint from "react-to-print";

class Order extends Component{
	state = {
		show: false
	};

	handleShow = async (id) => {
		await this.props.fetchOrdersDetails(id);
		this.setState({ show: true });
	};

    updateHandler = async (id,status) => {
        await this.props.updateOrders(id,status);
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
                    Product Categories 
                </th>
                <td>
                    {ordersDetails.product.Product_category.name}
                </td>
            </tr>
            <tr>
                <th>
                    Product Name 
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
    printOrder = (id) => {
        const ordersHtml = '<html><head><title></title></head><body>'+
        '<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8b5181ed-0827-471c-972b-74c77e326e3d">'+
        '<tbody>'+
          '<tr>'+
            '<td style="padding:30px 20px 18px 30px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #0055ff; font-size: 24px">Order Summary</span></div><div></div></div></td>'+
          '</tr>'+
        '</tbody>'+
      '</table></body></html>';

        const oldPage = document.body.innerHTML;
        document.body.innerHTML = ordersHtml;
        // window.open();
        window.print();
        // window.close();
        document.body.innerHTML = oldPage
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
                            <td>{new Date(orders[i].orderDate).toLocaleDateString()}</td>
                            <td><Button variant="info" onClick={() => this.handleShow(orders[i].id)}>View Order</Button></td>
                            {
                             orders[i].status === "Delivered" ? <td><Alert variant="success"> {orders[i].status} </Alert></td> :
                             orders[i].status === "Canceled" ? <td><Alert variant="danger"> {orders[i].status} </Alert></td> : 
                            <td><Alert variant="info"> <Alert.Link onClick={() => this.updateHandler(orders[i].id,"Delivered")}>{orders[i].status}</Alert.Link></Alert></td>
                            }
                            {/* <td>
                            <ReactToPrint trigger={() => <a href="#">Print this out!</a>} content={() => this.printOrder} />
                            <Order ref={el => (this.printOrder = el)} />
                            </td> */}
                            <td><Button variant="info" as={Link} to={"/admin/printorder/"+orders[i].id}>Print</Button></td>
                        </tr>
                    )
                }
            }
            return ordersArr;
        }
    
    render(){
        return <>
        <Table responsive striped bordered hover size="sm">
        <thead>
        <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Email ID</th>
                <th>Contact No</th>
                <th>Total Amount</th>
                <th>Order Date</th>
                <th>Order</th>
                <th>Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        { this.renderProductOrder(this.props.orders, this.props.active, this.props.perPage) }     
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
                        {this.renderOrderDetails(this.props.ordersDetails) }
                    </Table>
                </Modal.Body>
            </Modal>
        </>
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
        updateOrders:(id,status)=>dispatch(updateOrders(id,status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);