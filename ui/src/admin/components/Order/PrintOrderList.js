import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
// import ReactToPrint from "react-to-print";
const PrintOrderList = (props) => {
    return <>
    <div style={{ display: "none" }}> 
        <div ref={props.printBlockRef}>
        {printDataHandler(props.orderBill)}
        <Card key={"index"} style={{ borderWidth: 0 }}>
            <Card.Body>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {printHandler(props.orderBill)}
                    </tbody>
                </Table>
                <hr ></hr>
                {printDatasHandler(props.orderBill)}
                
            </Card.Body>
        </Card>
         </div>
     </div>    
    </>
}
const printDatasHandler = (bill) => {
    return bill.map((bill, index) => (index+1 === 1) ? <table key={"i"+index+1} className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{tableLayout:'fixed',marginLeft:'-14px'}} data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935.1">
    <tbody>
        <tr>
            <td style={{padding:'18px 20px 30px 30px', lineHeight:'22px', textAlign:'inherit'}} height="100%" valign="top" bgcolor="" role="module-content"><div><div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>Subtotal :- </b>Rs. {bill.order.totalPrice}/-</div>
                <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><b>OrderDate :-</b> {(new Date(bill.order.orderDate)).toLocaleString()}</div>
                <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><br></br>
                    <b>Total</b>&nbsp;</div>
                    <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><br></br></div>
                        <div style={{fontFamily: 'inherit', textAlign: 'inherit'}}><span style={{color: '#0055ff', fontSize: '32px', fontFamily: 'inherit'}}>Rs. {bill.order.totalPrice} /-</span>
                    </div>
                    <div>
                </div>
                </div>
                </td>
        </tr>
    </tbody>
    </table> : ""
)};
const printDataHandler = (bill) => {
    return bill.map((bill, index) => (index+1 === 1) ? <div key={index+1}><table className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="8b5181ed-0827-471c-972b-74c77e326e3d">
    <tbody>
        <tr>
            <td style={{ padding: '30px 20px 18px 30px', lineHeight: '22px', textAlign: 'inherit' }} height="100%" valign="top" bgcolor="" role="module-content"><div><div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><span style={{ color: '#0055ff', fontSize: '24px' }}>Order Bill</span></div><div></div></div></td>
        </tr>
    </tbody>
</table>
<hr ></hr>
<table className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935">
    <tbody>
        <tr>
            <td style={{ padding: '18px 20px 18px 30px', lineHeight: '22px', textAlign: 'inherit' }} height="100%" valign="top" bgcolor="" role="module-content">
                <div>
                <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}>Dear, {bill.order.user.username}</div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><br></br></div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Email :-</b>{bill.order.user.email}</div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Mobile No :-</b>{bill.order.user.contact}</div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Address :-</b>{bill.order.user.address}</div>
                    <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><b>Payment Mode :-</b>{bill.order.mode}</div>
                </div>
            </td>
        </tr>
    </tbody>
</table></div>:"")
}
const printHandler = (ordersDetails) => {
    return ordersDetails.map((ordersDetails, index) =>
    <tr key={"index"+index}>
        <td>{index+1}</td>
        <td>{ordersDetails.product.name}</td>
        <td>{ordersDetails.quantity}</td>
        <td>Rs. {ordersDetails.product.price} /-</td>
    </tr>
    )
}

export default PrintOrderList;