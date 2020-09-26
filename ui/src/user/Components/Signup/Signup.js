import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap'

import { Link, Route, withRouter } from 'react-router-dom';


class Signup extends Component {
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
                <Row style={{ justifyContent: 'center' ,marginTop:"10px"}}>
                    <Col sm="8">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody >
                                <CardTitle style={style.cardTitle}>Sign Up</CardTitle>
                                <Form>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="username" className="mr-sm-2">Username</Label>
                                        <Input type="text" name="username" id="username" placeholder="Enter Your Username" />
                                    </FormGroup>
                                <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="email" placeholder="abc@gmail.com" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password" id="password" placeholder="Enter Your Password" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                   
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input type="textarea"  name="address" id="address" placeholder="Enter Your Address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contact">Contact</Label>
                                        <Input type="number" name="contact" id="contact" placeholder="9999999999" />
                                    </FormGroup>

                                    <div className="text-right">
                                        <Nav.Link as={Link} to="/login" className="forgot-link">Back To Login ?</Nav.Link>
                                    </div>
                                    <Button type="submit" style={style.cardBtn} color="primary">Sign Up</Button>


                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </>
        )
    }
}

export default withRouter(Signup);