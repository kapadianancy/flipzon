import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Nav } from 'react-bootstrap'

import { Link, Route, withRouter } from 'react-router-dom';


class Forgetpassword extends Component {
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
                <Row style={{ justifyContent: 'center' }}>
                    <Col sm="5">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody >
                                <CardTitle style={style.cardTitle}>Forget Password</CardTitle>
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="email" className="mr-sm-2">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="abc@gmail.com" />
                                    </FormGroup>
                                    
                                    <div className="text-right">
                                        <Nav.Link as={Link} to="/login" className="forgot-link">Back To Login ?</Nav.Link>
                                    </div>
                                    <Button type="submit" style={style.cardBtn} color="primary">Submit</Button>
                                    

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
              
            </>
        )
    }
}

export default withRouter(Forgetpassword);