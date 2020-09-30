import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux';

import { Link, Route, withRouter } from 'react-router-dom';
import * as actions from '../../redux-store/Actions/UserAction';


class ChangePassword extends Component {

    state = {
        old_password : "",
        new_password : "",
        confirm_password : "",
        errors: {}
    }

    async btn_click(e) {
        e.preventDefault();

        if (this.validate()) {
        }
    }

    validate() {
        let input = this.state;
        let errors = {};
        let isValid = true;

        if (!input["old_password"]) {
            isValid = false;
            errors["old_password"] = "Please enter your old password.";
        }
        if (!input["new_password"]) {
            isValid = false;
            errors["new_password"] = "Please enter your new password.";
        }
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if(input["new_password"] !== input["confirm_password"])
        {
            isValid = false;
            errors["err"] = "New Password and Confirm Password Must be Same";
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
                <Row style={{ justifyContent: 'center' }}>
                    <Col sm="5">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody >
                                <CardTitle style={style.cardTitle}>Change Password</CardTitle>
                                <div className="text-danger">{this.state.errors.err}</div>
                                <Form>
                                    <FormGroup>
                                        <Label for="old_password">Old Password</Label>
                                        <div className="text-danger">{this.state.errors.old_password}</div>
                                        <Input type="text" name="old_password" id="old_password"
                                            value={this.state.old_password}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Old Password" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="new_password">New Password</Label>
                                        <div className="text-danger">{this.state.errors.new_password}</div>
                                        <Input type="password" name="new_password" id="new_password"
                                            value={this.state.new_password}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your New Password" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="confirm_password">Confirm Password</Label>
                                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                                        <Input type="password" name="confirm_password" id="confirm_password"
                                            value={this.state.confirm_password}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Confirm Password" />
                                    </FormGroup>

                                    <Button type="submit" style={style.cardBtn}
                                        onClick={this.btn_click.bind(this)}
                                        color="primary">Change Password</Button>


                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </>
        )
    }
}



export default ChangePassword;