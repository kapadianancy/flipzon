import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
// import ReactToPrint from "react-to-print";
import './PrintOrder.css';
class PrintOrderList extends Component {
    state = {
        date:"",
        add:"",
        price:""
    }
    printClickHandler = () => {
        // const printableElements = document.getElementById('printme').innerHTML;
        // const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        // document.body.innerHTML = orderHTML;
        window.print();
        document.body.innerHTML = oldPage
        
    }
    printDatasHandler = (bill) => {
        return bill.map((bill, index) =><table key={"i"+index+1} className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{tableLayout:'fixed',marginLeft:'-14px'}} data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935.1">
        <tbody>
            <tr>
                <td style={{padding:'18px 20px 30px 30px', lineHeight:'22px', textAlign:'inherit'}} height="100%" valign="top" bgcolor="" role="module-content"><div><div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>Subtotal :- </b>Rs. {bill.totalPrice}/-</div>
                    <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>OrderDate :-</b> {(new Date(bill.orderDate)).toLocaleString()}</div>
                    {/* <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>Delivery Charges</b> - $1.99</div>
                    <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>Driver Tips</b> - $2.49</div> */}
                    <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><br></br>
                        <b>Total</b>&nbsp;</div>
                        <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><br></br></div>
                            <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><span style={{color: '#0055ff', fontSize: '32px', fontFamily: 'inherit'}}>Rs. {bill.totalPrice} /-</span>
                        </div>
                        <div>
                    </div>
                    </div>
                    </td>
            </tr>
        </tbody>
    </table>
        )}
    printDataHandler = (bill) => {
        return bill.map((bill, index) => <div key={index+1}><table className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="8b5181ed-0827-471c-972b-74c77e326e3d">
        <tbody>
            <tr>
                <td style={{ padding: '30px 20px 18px 30px', lineHeight: '22px', textAlign: 'inherit' }} height="100%" valign="top" bgcolor="" role="module-content"><div><div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><span style={{ color: '#0055ff', fontSize: '24px' }}>Order Summary</span></div><div></div></div></td>
            </tr>
        </tbody>
    </table>
    <hr ></hr>
    <table className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935">
        <tbody>
            <tr>
                <td style={{ padding: '18px 20px 18px 30px', lineHeight: '22px', textAlign: 'inherit' }} height="100%" valign="top" bgcolor="" role="module-content">
                    <div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}>Dear, {bill.user.username}</div>
                        {/* <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><span style={{ color: '#0055ff' }}> */}
                            {/* <strong>Expected Delivery Time: 9:50 - 10:15 PM</strong></span></div> */}
                        <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><br></br></div>
                        <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Email :-</b>{bill.user.email}</div>
                        <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Mobile No :-</b>{bill.user.contact}</div>
                        {/* <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}>{bill.orderDate}</div> */}
                        <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Address :-</b>{bill.user.address}</div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table></div>)
    }
    printHandler = (ordersDetails) => {
        return ordersDetails.map((ordersDetails, index) =>
        <tr key={"index"+index}>
            <td>{index+1}</td>
            <td>{ordersDetails.product.name}</td>
            <td>{ordersDetails.quantity}</td>
            <td>Rs. {ordersDetails.product.price} /-</td>
        </tr>
    )
}
    render() {
        return <>
            {this.printDataHandler(this.props.orderBill)}
            <Card key={"index"} style={{ borderWidth: 0 }}>
                <Card.Body>
                    <Table>
                        <thead>
                            <th>#</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </thead>
                        <tbody>
                            {this.printHandler(this.props.ordersDetails)}
                        </tbody>
                    </Table>
                    <hr ></hr>
                    {this.printDatasHandler(this.props.orderBill)}
                    <Button id="printPageButton" className="btn btn-primary float-left mt-4 ml-2" onClick={this.printClickHandler}>Print</Button>
                </Card.Body>
            </Card>
        </>
    }
}

export default PrintOrderList;