import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../../redux-store/Actions/UserAction';


class EditProfile extends Component {

    state = {
        userid:"",
        username: "",
        email: "",
        address: "",
        contact: "",
        errors: {}
    }

    async btn_edit_click(e) {
        e.preventDefault();

        if (this.validate()) {

            const CurrentUser = {
                userid: this.state.userid,
                username: this.state.username,
                email: this.state.email,
                address: this.state.address,
                contact: this.state.contact
            }
            await this.props.signup(CurrentUser);
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
            }

        };
        return (



            <>

                <Row style={{ justifyContent: 'center', marginTop: "10px" }}>
                    <Col sm="8">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody >
                                <CardTitle style={style.cardTitle}>Edit Profile</CardTitle>

                                <Form>
                                <Input type="hidden" name="userid" id="userid"
                                            value={this.state.userid} />
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="username" className="mr-sm-2">Username</Label>
                                        <div className="text-danger">{this.state.errors.username}</div>
                                        <Input type="text" name="username" id="username"
                                            required="true"
                                            value={this.state.username}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Username" />
                                    </FormGroup>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <div className="text-danger">{this.state.errors.email}</div>
                                                <Input type="email" name="email" id="email"
                                                    value={this.state.email}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="abc@gmail.com" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="contact">Contact</Label>
                                                <div className="text-danger">{this.state.errors.contact}</div>
                                                <Input type="number" name="contact" id="contact"
                                                    value={this.state.contact}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="9999999999" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <div className="text-danger">{this.state.errors.address}</div>
                                        <Input type="textarea" name="address" id="address"
                                            value={this.state.address}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Address" />
                                    </FormGroup>

                                    <Button type="submit" style={style.cardBtn}
                                        onClick={this.btn_edit_click.bind(this)}
                                        color="primary">Edit</Button>


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
        signup: (CurrentUser) => dispatch(actions.signup(CurrentUser))
    }
}


export default connect(mapStateToProp, mapStateToActions)(EditProfile);