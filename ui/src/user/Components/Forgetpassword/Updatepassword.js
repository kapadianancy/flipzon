import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import * as actions from '../../redux-store/Actions/UserAction';


class UpdatePassword extends Component {

    state = {
        new_password: "",
        confirm_password: "",
        message: "",
        errors: {}
    }

    async btn_click(e) {
        e.preventDefault();

        if (this.validate()) {
            
            const passwords = {
                newpass: this.state.new_password,
                id:this.props.match.params.uid
            }
            await this.props.updatepassword(passwords);
            if (this.props.error !== "") {
                this.props.history.push("/error/" + this.props.error);
            }
            else {
                this.setState({
                    new_password: "",
                    confirm_password: "",
                    message:this.props.message,
                    errors : {}
                })
            }
         }
        
    }

    validate() {
        let input = this.state;
        let errors = {};
        let isValid = true;

        if (!input["new_password"]) {
            isValid = false;
            errors["new_password"] = "Please enter your new password.";
        }
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (input["new_password"] !== input["confirm_password"]) {
            isValid = false;
            errors["err"] = "New Password and Confirm Password Must be Same";
        }

        this.setState({
            message:"",
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
                                <CardTitle style={style.cardTitle}>Update Password</CardTitle>
                                <div className="text-success">{this.state.message}</div>
                                <div className="text-danger">{this.state.errors.err}</div>
                                <Form>
                                   
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
                                        color="primary">Update Password</Button>


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
        error: state.User.error,
        message: state.User.message
    }
}

const mapStateToActions = (dispatch) => {
    return {
        updatepassword: (passwords) => dispatch(actions.updatepassword(passwords))
    }
}

export default connect(mapStateToProp, mapStateToActions)(withRouter(UpdatePassword));
