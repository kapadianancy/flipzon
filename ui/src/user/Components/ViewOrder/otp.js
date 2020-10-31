import React, { Component } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import OtpInput from 'react-otp-input';

import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux-store/Actions/OrderAction";

class otp extends Component {
    state = {
        otp: '',
        message: 'Check Your email for OTP',
        error: "",
    };


    handleChange = otp => this.setState({ otp });

    async submitHandler(e) {
        e.preventDefault();
        if (this.state.otp == this.props.otp) {
            const status = {
                "mode": "Card",
                "payment_status": "Confirm"
            }
            await this.props.placeOrder(this.props.orderItems[0].orderId, status);
            this.props.history.push('/success');
        }
        else {
            this.setState({
                message: "",
                error: "OTP Is Not Valid"
            })
        }

    }

    render() {
        const style = {
            cardBtn: {
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                // backgroundColor: "#007bff",
                // borderColor : "#007bff",
                margin: "10px",
                color: "white",
                width: "170px",
            },
            cardTitle: {
                color: "#007bff",
                fontWeight: "bold",
                fontFamily: "Times New Roman",
                fontSize: "30px",
            },
            labelTitle: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: '20px'
            },
            otp: {
                marginLeft: '175px',
                justifyContent: 'center'
            }
        };
        return (
            <>
                <Header />
                <Row style={{ justifyContent: "center", marginTop: "30px" }}>
                    <Col sm="5">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody>
                                <CardTitle style={style.cardTitle}>OTP</CardTitle>
                                <h6 className="text-success">{this.state.message}</h6>
                                <h6 className="text-danger">{this.state.error}</h6>

                                <div style={style.otp}>
                                    <OtpInput
                                        value={this.state.otp}
                                        onChange={this.handleChange}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                        isInputNum="true"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    style={style.cardBtn}
                                    color="primary"
                                    onClick={this.submitHandler.bind(this)}
                                >
                                    Submit
                  </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        orderItems: state.Order.orderItems,
        otp: state.Order.otp
    };
};

const mapStateToAction = (dispatch) => {
    return {
        placeOrder: (oid, status) => dispatch(actions.placeOrder(oid, status)),
    };
};

export default connect(mapStateToProp, mapStateToAction)(withRouter(otp));
