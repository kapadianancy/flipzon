import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Nav } from "react-bootstrap";

import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux-store/Actions/UserAction";

import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async submitHandler(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    await this.props.login(user);
    // console.log(this.props.error);
    if (this.props.error !== "") 
    {
        if(this.props.error === "Request failed with status code 401")
        {
            this.setState({
                error:"Invalid user"
            })
        }
        else
        {
            this.props.history.push('/error/'+this.props.error);
        }
    }
    else{
        
        this.props.history.push('/');
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
    };
    return (
      <>
        <Row style={{ justifyContent: "center", marginTop: "30px" }}>
          <Col sm="5">
            <Card className="shadow p-3 mb-5 bg-white rounded">
              <CardBody>
                <CardTitle style={style.cardTitle}>Login</CardTitle>
                <h4 className="text-danger">{this.state.error}</h4>
                <Form>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="username" className="mr-sm-2">
                      Username
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={this.state.username}
                      onChange={this.changeHandler}
                      placeholder="Enter Your Username"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="password" className="mr-sm-2">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                      placeholder="Enter Your Password"
                      required
                    />
                  </FormGroup>
                  <div className="text-right">
                    <Nav.Link
                      as={Link}
                      to="/forgetPassword"
                      className="forgot-link"
                    >
                      Forgot Password ?
                    </Nav.Link>
                  </div>
                  <Button
                    type="submit"
                    style={style.cardBtn}
                    color="primary"
                    onClick={this.submitHandler.bind(this)}
                  >
                    Login
                  </Button>
                  <div className="text-center dont-have">
                    Don’t have an account?
                    <Nav.Link as={Link} to="/signup">
                      Register
                    </Nav.Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    error: state.User.error,
  };
};

const mapStateToAction = (dispatch) => {
  return {
    login: (user) => dispatch(actions.login(user)),
  };
};

export default connect(mapStateToProp, mapStateToAction)(withRouter(Login));
