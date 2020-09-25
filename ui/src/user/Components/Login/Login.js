import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap'

import { Link, Route, withRouter } from 'react-router-dom';


import './Login.css';

class Login extends Component {
    render() {
        const style = {
            cardBtn: {
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                // backgroundColor: "#007bff",
                // borderColor : "#007bff",
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
                                <CardTitle style={style.cardTitle}>Login</CardTitle>
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="username" className="mr-sm-2">Username</Label>
                                        <Input type="text" name="username" id="username" placeholder="Enter Your Username" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="password" className="mr-sm-2">Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="Enter Your Password" />
                                    </FormGroup>
                                    <div className="text-right">
                                        <Nav.Link as={Link} to="/forgetPassword" className="forgot-link">Forgot Password ?</Nav.Link>
                                    </div>
                                    <Button type="submit" style={style.cardBtn} color="primary">Login</Button>
                                    <div className="text-center dont-have">Don’t have an account?
                                        <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                                    </div>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
              
            </>
        )
    }
}

export default withRouter(Login);