import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Link, Route, withRouter } from 'react-router-dom';
import * as actions from '../../redux-store/actions/UserAction';


class Signup extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        address: "",
        contact: "",
        roleId: "2"

    }

    async btn_sign_click(e) {
        e.preventDefault();
        //console.log(this.state)
        const CurrentUser = {
            ...this.state
        }
        await this.props.signup(CurrentUser);
    }


    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value
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
                                <CardTitle style={style.cardTitle}>Sign Up</CardTitle>

                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="username" className="mr-sm-2">Username</Label>
                                        <Input type="text" name="username" id="username"
                                            value={this.state.username}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Username" />
                                    </FormGroup>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="email"
                                                    value={this.state.email}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="abc@gmail.com" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password" id="password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange.bind(this)}
                                                    placeholder="Enter Your Password" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input type="textarea" name="address" id="address"
                                            value={this.state.address}
                                            onChange={this.handleChange.bind(this)}
                                            placeholder="Enter Your Address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contact">Contact</Label>
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
        token: state.User.token
    }
}

const mapStateToActions = (dispatch) => {
    return {
        signup: (CurrentUser) => dispatch(actions.signup(CurrentUser))
    }
}


export default withRouter(connect(mapStateToProp, mapStateToActions)(Signup));