import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux';

import { Link, Route, withRouter } from 'react-router-dom';
import * as actions from '../../redux-store/Actions/UserAction';


class Forgetpassword extends Component {

    state = {
        email: "",
        error: "",
        message : ""
    }

    async btn_click(e) {
        e.preventDefault();
        if(this.validate())
        {
            const userEmail = {
                email: this.state.email
            }
            await this.props.forgetpassword(userEmail);

            if(this.props.message !== "")
            {
                this.setState({
                    error : "",
                    email : "",
                    message : this.props.message
                })
            }
            else if(this.props.error !== "")
            {
                this.setState({
                    error : this.props.error,
                    message: ""
                })
            }
        }
    }

    validate() {
        let input = this.state;
        let errors = "";
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors = "Please enter your email Address.";
        }

        else if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors = "Please enter valid email address.";
            }
        }

        this.setState({
            error: errors
        });

        return isValid;
    }


    handlerChange(e) {
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
                                <CardTitle style={style.cardTitle}>Forget Password</CardTitle>
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="email" className="mr-sm-2">Email</Label>
                                        <div className="text-danger">{this.state.error}</div>
                                        <div className="text-success">{this.state.message}</div>
                                        <Input type="email" name="email" id="email"
                                            value={this.state.email}
                                            onChange={this.handlerChange.bind(this)}
                                            placeholder="abc@gmail.com" />
                                    </FormGroup>

                                    <div className="text-right">
                                        <Nav.Link as={Link} to="/login" className="forgot-link">Back To Login ?</Nav.Link>
                                    </div>
                                    <Button type="submit" style={style.cardBtn}
                                        onClick={this.btn_click.bind(this)}
                                        color="primary">Submit</Button>


                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.User.message,
        error: state.User.error
    }
}

const mapStateToActions = (dispatch) => {
    return {
        forgetpassword: (userEmail) => dispatch(actions.forgetpassword(userEmail))
    }
}

export default withRouter(connect(mapStateToProps, mapStateToActions)(Forgetpassword));