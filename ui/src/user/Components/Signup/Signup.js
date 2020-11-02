import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Link, Redirect, Route, withRouter } from 'react-router-dom';
import * as actions from '../../redux-store/Actions/UserAction';


class Signup extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        address: "",
        contact: "",
        roleId: "2",
        errors: {}
    }

    async btn_sign_click(e) {
        e.preventDefault();

        if (this.validate()) {

            const CurrentUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                contact: this.state.contact,
                roleId: "2",
            }
            await this.props.signup(CurrentUser);
            //console.log(this.props.error);
            if (this.props.error == "") {
                this.props.history.push('/');
            }
            else {
                this.props.history.push('/error/' + this.props.error);
            }

        }
    }

    validate() {
        let input = this.state;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your Username.";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["contact"]) {
            isValid = false;
            errors["contact"] = "Please enter your phone number.";
        }

        if (typeof input["contact"] !== "undefined") {

            var pattern = new RegExp(/^[6-9][0-9]{9}$/);
            if (!pattern.test(input["contact"])) {
                isValid = false;
                errors["contact"] = "Please enter valid phonenumber.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["address"]) {
            isValid = false;
            errors["address"] = "Please enter your address.";
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;


        this.setState({
            [name]: value
        })
    }

    render() {

        const style = {
            cardBtn: {
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                //    backgroundColor: "#007bff",
                //    borderColor : "#007bff",
                margin: '10px',
                color: "white",
                width: '170px'
            },
            cardTitle: {
                color: "#007bff",
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: '30px'
            },
            labelTitle: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: '20px'
            }

        };
        return (



            <>
                {/* {this.props.error!=""?this.props.history.replace('/error/'+this.props.error):null} */}
                <Row style={{ justifyContent: 'center', marginTop: "10px" }}>
                    <Col sm="8">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody >
                                <CardTitle style={style.cardTitle}>Sign Up</CardTitle>

                                <Form>
                                    <FormGroup>
                                        <Label style={style.labelTitle} for="email">Email</Label>
                                        <div className="text-danger">{this.state.errors.email}</div>
                                        <Input type="email" name="email" id="email"
                                            value={this.state.email}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="abc@gmail.com" />
                                    </FormGroup>

                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                                                <Label for="username" style={style.labelTitle} className="mr-sm-2">Username</Label>
                                                <div className="text-danger">{this.state.errors.username}</div>
                                                <Input type="text" name="username" id="username"
                                                    required="true"
                                                    value={this.state.username}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="Enter Your Username" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label style={style.labelTitle} for="password">Password</Label>
                                                <div className="text-danger">{this.state.errors.password}</div>
                                                <Input type="password" name="password" id="password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="Enter Your Password" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="address" style={style.labelTitle}>Address</Label>
                                        <div className="text-danger">{this.state.errors.address}</div>
                                        <Input type="textarea" name="address" id="address"
                                            value={this.state.address}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contact" style={style.labelTitle}>Contact</Label>
                                        <div className="text-danger">{this.state.errors.contact}</div>
                                        <Input type="number" name="contact" id="contact"
                                            value={this.state.contact}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="9999999999" />
                                    </FormGroup>

                                    <div className="text-right">
                                        <Nav.Link as={Link} to="/login" className="forgot-link">Back To Login ?</Nav.Link>
                                    </div>
                                    <Button type="submit" style={style.cardBtn}
                                        onClick={this.btn_sign_click.bind(this)}
                                        color="primary">Sign Up</Button>


                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        user: state.User.user,
        token: state.User.token,
        error: state.User.error
    }
}

const mapStateToActions = (dispatch) => {
    return {
        signup: (CurrentUser) => dispatch(actions.signup(CurrentUser)),
        login: (user) => dispatch(actions.login(user))
    }
}


export default withRouter(connect(mapStateToProp, mapStateToActions)(Signup));