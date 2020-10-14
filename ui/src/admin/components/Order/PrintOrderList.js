import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import ReactToPrint from "react-to-print";
import './PrintOrder.css';
class PrintOrderList extends Component {
    state = {
        date:"",
        add:"",
        price:""
    }
    // componentDidMount = async () => {
    //     let order = await this.props.orderBill;
    //     console.log(this.props.orderBill)
    //     console.log(order.orderDate)
    //     this.setState({
    //         // date:
    //     })
    // }
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
        <div key={index+1}>
        <table key={index+1} border="0" cellPadding="0" cellSpacing="0" align="center" width="100%" role="module" data-type="columns" style={{ padding: '20px 20px 0px 30px', marginRight: '-14px' }} bgcolor="#FFFFFF">
        <tbody>
            <tr role="module-content">
                <td height="100%" valign="top">
                     <h4><b>{index+1}. {ordersDetails.product.name}</b></h4>
                    <br></br>
                    <br></br>
                    <table className="column" width="137" style={{ width: "137px", borderSpacing: '0', borderCollapse: 'collapse', margin: '0px 0px 0px 0px' }} cellPadding="0" cellSpacing="0" align="left" border="0" bgcolor="">
                        <tbody>
                            <tr>
                                <td style={{ padding: '0px', margin: '0px', borderSpacing: '0' }}><table className="wrapper" role="module" data-type="image" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="239f10b7-5807-4e0b-8f01-f2b8d25ec9d7">
                                    
                                    <tbody>
                                        <tr>
                                            <td style={{ fontSize: '6px', lineHeight: '10px', padding: '0px 0px 0px 0px' }} valign="top" align="left">
                                                <img className="max-width" border="0" style={{ display: 'block', color: '#000000', textDecoration: 'none', fontFamily: 'Helvetica, arial, sansSerif', fontSize: '16px' }} width="104" alt="" data-proportionally-constrained="true" data-responsive="false" src={"http://localhost:8080"+(ordersDetails.product.main_image)} height="200" width="300" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="column" width="137" style={{ width: '137px', borderSpacing: '0', borderCollapse: 'collapse', marginLeft: '210px' }} cellPadding="0" cellSpacing="0" align="left" border="0" bgcolor="">
                        <tbody>
                            <tr>
                                <td style={{ padding: '0px', margin: '0px', borderSpacing: '0' }}><table className="module" role="module" data-type="text" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ tableLayout: 'fixed' }} data-muid="f404b7dc-487b-443c-bd6f-131ccde745e2">
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '18px 0px 18px 0px', lineHeight: '22px', textAlign: 'inherit' }} height="100%" valign="top" bgcolor="" role="module-content"><div><div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><h4>Description</h4>{ordersDetails.product.description}</div><div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}>Qty:{ordersDetails.quantity}</div>
                                                <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><br></br></div>
                                                <div style={{ fontFamily: 'inherit', textAlign: 'inherit' }}><span style={{ color: '#0055ff' }}>{"Rs." + ordersDetails.price}&nbsp;</span></div><div></div></div></td>
                                        </tr>
                                    </tbody>
                                </table></td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="137" style={{ width: '137px', borderSpacing: '0', borderCollapse: 'collapse', margin: '0px 0px 0px 0px' }} cellPadding="0" cellSpacing="0" align="left" border="0" bgcolor="" className="column column-2">
                        <tbody>
                            <tr>
                                <td style={{ padding: '0px', margin: '0px', borderSpacing: '0' }}></td>
                            </tr>
                        </tbody>
                    </table><table width="137" style={{ width: '137px', borderSpacing: '0', borderCollapse: 'collapse', margin: '0px 0px 0px 0px' }} cellPadding="0" cellSpacing="0" align="left" border="0" bgcolor="" className="column column-3">
                        <tbody>
                            <tr>
                                <td style={{ padding: '0px', margin: '0px', borderSpacing: '0' }}></td>
                            </tr>
                        </tbody>
                    </table></td>
            </tr>
        </tbody>
    </table>
    <br></br>
    </div>
    )
}
    render() {
        return <>
            {this.printDataHandler(this.props.orderBill)}
            <Card key={"index"} style={{ borderWidth: 0 }}>
                <Card.Body>
                    {this.printHandler(this.props.ordersDetails)}
                    <hr ></hr>
                    {this.printDatasHandler(this.props.orderBill)}
                    <Button id="printPageButton" className="btn btn-primary float-left mt-4 ml-2" onClick={this.printClickHandler}>Print</Button>
                </Card.Body>
            </Card>
        </>
    }
}

export default PrintOrderList;