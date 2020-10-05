import React, { Component } from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBTabPane,
    MDBTabContent, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions
} from "mdbreact";
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import * as actions from '../../redux-store/Actions/OrderAction';
import * as paction from '../../redux-store/Actions/ProductAction';

class viewBill extends Component {
    state = {
        activePill: "1",
    }

    togglePills = tab => {
        if (this.state.activePill !== tab) {
            this.setState({
                ctivePill: tab
            });
        }
    }

    selectNextTab = () => {
        this.setState({
            activePill: (this.state.activePill + 1).toString()
        });
    }

    componentDidMount() {
        this.props.viewCart();
    }

    placeOrder = async () => {
         await this.props.placeOrder(this.props.orderItems[0].orderId);
         alert("Your Order Is Placed");
        
    }

    render() {
        const { activePill } = this.state;

        let rows = [];
        let total_price = 0;

        this.props.orderItems.map(async (row) => {
            total_price += row.quantity * row.price;
            rows.push(
                <>
                    <MDBRow>
                        <MDBCol sm="8">
                            {row.name}- qty-{row.quantity}
                        </MDBCol>
                        <MDBCol sm="4">
                            {row.quantity * row.price}
                        </MDBCol>
                    </MDBRow>
                    <hr />
                </>
            )

            return rows;
        });


        return (
            <MDBContainer>
                <MDBRow className="my-2" center>
                    <MDBCard className="w-100">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol lg="8" className="mb-4">
                                    <MDBNav pills color="primary" className="nav-justified">
                                        <MDBNavItem>
                                            <MDBNavLink to="#" className={activePill === "1" ? "active" : ""} onClick={() => this.togglePills("1")}
                                            >
                                                <strong>1. Billing</strong>
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    </MDBNav>
                                    <MDBTabContent className="pt-4" activeItem={activePill}>
                                        <MDBTabPane tabId="1">
                                            <form>
                                                <MDBRow>
                                                    <MDBCol md="6" className="mb-4">
                                                        <label htmlFor="firstName">First name</label>
                                                        <input type="text" id="firstName" className="form-control" />
                                                    </MDBCol>
                                                    <MDBCol md="6" className="mb-2">
                                                        <label htmlFor="lastName">Last name</label>
                                                        <input type="text" id="lastName" className="form-control" />
                                                    </MDBCol>
                                                    <MDBCol>

                                                        <label htmlFor="email">Email (optional)</label>
                                                        <input type="text" id="email" className="form-control mb-4" placeholder="youremail@example.com" />
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" id="address" className="form-control mb-4" placeholder="1234 Main St" />
                                                        <label htmlFor="address-2">Address 2 (optional)</label>
                                                        <input type="text" id="address-2" className="form-control mb-4" placeholder="Apartment or suite" />
                                                    </MDBCol>
                                                </MDBRow>

                                                <hr />


                                            </form>
                                            <MDBNav pills color="primary" className="nav-justified">
                                                <MDBNavItem>
                                                    <MDBNavLink to="#" className={activePill === "1" ? "active" : ""} onClick={() => this.togglePills("1")}
                                                    >
                                                        <strong>2. Payment</strong>
                                                    </MDBNavLink>
                                                </MDBNavItem>
                                            </MDBNav>

                                            <div className="d-block my-3">
                                                <div className="mb-2">
                                                    <input name="group2" type="radio" className="form-check-input with-gap" id="radioWithGap4" required />
                                                    <label className="form-check-label" htmlFor="radioWithGap4">Credit card</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input iname="group2" type="radio" className="form-check-input with-gap" id="radioWithGap5"
                                                        required />
                                                    <label className="form-check-label" htmlFor="radioWithGap5">Debit card</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input name="group2" type="radio" className="form-check-input with-gap" id="radioWithGap6" required />
                                                    <label className="form-check-label" htmlFor="radioWithGap6">Paypal</label>
                                                </div>
                                                <MDBRow>
                                                    <MDBCol md="6" className="mb-3">
                                                        <label htmlFor="cc-name123">Name on card</label>
                                                        <input type="text" className="form-control" id="cc-name123" required />
                                                        <small className="text-muted">Full name as displayed on card</small>
                                                        <div className="invalid-feedback">
                                                            Name on card is required
                          </div>
                                                    </MDBCol>
                                                    <MDBCol md="6" className="mb-3">
                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                        <input type="text" className="form-control" id="cc-number123" required />
                                                        <div className="invalid-feedback">
                                                            Credit card number is required
                          </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="3" className="mb-3">
                                                        <label htmlFor="cc-name123">Expiration</label>
                                                        <input type="text" className="form-control" id="cc-name123" required />
                                                        <div className="invalid-feedback">
                                                            Name on card is required
                          </div>
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                        <input type="text" className="form-control" id="cc-cvv123" required />
                                                        <div className="invalid-feedback">
                                                            Security code required
                          </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </div>
                                        </MDBTabPane>


                                    </MDBTabContent>
                                </MDBCol>
                                <MDBCol lg="4" className="mb-4">
                                    <MDBBtn color="primary" size="lg" onClick={this.placeOrder} block>
                                        Place order
                </MDBBtn>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <h4 className="mb-4 mt-1 h5 text-center font-weight-bold">Summary</h4>
                                            <hr />
                                            {rows}
                                            <MDBRow>
                                                <MDBCol sm="8">
                                                    <strong>Total</strong>
                                                </MDBCol>
                                                <MDBCol sm="4">
                                                    <strong>{total_price}</strong>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        orderItems: state.Order.orderItems,
        product: state.Product.products,
        error: state.Order.error
    }

}
const mapStateToAction = (dispatch) => {

    return {
        viewCart: () => dispatch(actions.viewCart()),
        getProduct: (pid) => dispatch(paction.productDetails(pid)),
        placeOrder: (oid) => dispatch(actions.placeOrder(oid))
    }
}

export default connect(mapStateToProps, mapStateToAction)(withRouter(viewBill));
