import React, { Component } from "react";
import img from '../../../images/product.png';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NumericInput from 'react-numeric-input';
import Modal from 'react-bootstrap/Modal'
import { Form, FormGroup, Label, Input } from "reactstrap";
import ReactStars from "react-rating-stars-component";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import * as actions from '../../redux-store/Actions/ProductAction';
import * as Orderactions from '../../redux-store/Actions/OrderAction';

class Product extends Component {

    state = {
        id: "",
        name: "",
        price: "",
        description: "",
        stock: "",
        main_image: "",
        qty: 1,
        show: false,
        feedback: "",
        rating: 1
    }

    async componentDidMount() {
        await this.props.productDetails(this.props.match.params.pid);

        this.setState({
            id: this.props.products.id,
            name: this.props.products.name,
            description: this.props.products.description,
            price: this.props.products.price,
            stock: this.props.products.stock,
            main_image: this.props.products.main_image
        })

    }

    addToCart = async (pid, qty) => {
        // localStorage.removeItem("device");

        let id;
        if (this.props.token == "") {
            if (localStorage.getItem("device") == null) {
                console.log("device generate");
                setPrefix("deviceId-");
                id = nextId();
                localStorage.setItem("device", id);
            }
            else {
                id = localStorage.getItem("device");
            }
        } else {
            id = this.props.userId;
            // localStorage.removeItem("device");
        }
        //alert("id===="+id);
        await this.props.addToCart(pid, qty, id);
        if (this.props.error !== "") {
            this.props.history.push("/error/" + this.props.error);
        }
        else
        {
            this.props.history.push("/viewordercart");
        }
        
    };

    handleShow = async () => {
        if (this.props.token !== "") {
            this.setState({ show: true });
        }
        else {
            this.props.history.push("/login");
        }


    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleChange = (event) => {
        this.setState({
            qty: event
        })
    }
    handleChanged(e) {
        const name = e.target.name;
        const value = e.target.value;


        this.setState({
            [name]: value
        })
    }
    onStarClick(event) {
        this.setState({ rating: event });
    }

    addReview = async () => {
        const review = {
            "review": this.state.feedback,
            "rating": this.state.rating,
            "productId": this.state.id
        }
        await this.props.addReview(review);
        if (this.props.error !== "") {
            this.props.history.push("/error/" + this.props.error);
        }
        this.setState({ show: false });
    }

    render() {

        const style = {
            cardBtn: {
                alignSelf: 'center',
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: '10px',
                color: "white",
                width: '170px'
            }
        }
        let data = [];
        let disable = false;
        let error = "";
        if (this.props.products.stock == 0) {
            disable = true;
            error = "Out Of Stock";

        }
        this.props.images.map(p => {

            data.push(
                <img src={`http://localhost:8080${p.image}`} alt="image" width="100px" height="80px" style={{ margin: "0px 5px" }} />
            )
            return data;
        });

        return (

            <>
                <Header />
                <ListGroup style={{ width: "80%", margin: "20px auto" }}>
                    <ListGroup.Item id="1">
                        <div class="card flex-row flex-wrap">
                            <div class="card-header border-0">
                                <img src={`http://localhost:8080${this.state.main_image}`} alt="image" height="150px" />
                                <div style={{ marginTop: "25px" }}>
                                    {data}
                                </div>

                            </div>
                            <div class="card-block px-2" style={{ padding: "20px", margin: "20px" }}>
                                <h4 class="card-title" style={{ color: "#fb641b" }}>{this.state.name}</h4>
                                <p class="card-text"><b>Description :</b> {this.state.description}</p>
                                <p class="card-text"><b>Price :  </b>₹ {this.state.price}</p>
                                <div className="text-danger"><b>{error}</b></div>
                                <NumericInput
                                    disabled={disable}
                                    className="form-control"
                                    defaultValue={1}
                                    min={1}
                                    max={this.state.stock}
                                    step={1}
                                    precision={0}
                                    size={5}
                                    mobile
                                    onChange={(event) => this.handleChange(event)}
                                />
                                <Button
                                    disabled={disable}
                                    id={this.state.id}
                                    style={style.cardBtn}
                                    onClick={() => this.addToCart(this.state.id, this.state.qty)}
                                >Add To Cart</Button>
                                <Button style={style.cardBtn} onClick={() => this.handleShow()}>
                                    Give Feedback
                                </Button>

                                <Modal show={this.state.show} >
                                    <Modal.Header>
                                        <Modal.Title style={{ color: "#fb641b" }}>Your Review</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Form>
                                            <div class="card flex-row flex-wrap">
                                                <div class="card-header">
                                                    <img src={`http://localhost:8080${this.state.main_image}`} alt="image" height="50px" width="50px" />
                                                </div>
                                                <div class="px-2">
                                                    <h4 class="card-title">{this.state.name}</h4>
                                                    <p class="card-text"><b>Price :  </b>{this.state.price}</p>
                                                </div>
                                            </div>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="rating" className="mr-sm-2">
                                                    Rating
                                            </Label>

                                                <ReactStars
                                                    count={5}
                                                    value={this.state.rating}
                                                    onChange={(event) => this.onStarClick(event)}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    fullIcon={<i className="fa fa-star"></i>}

                                                />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="feedback" className="mr-sm-2">
                                                    Review
                                            </Label>
                                                <Input
                                                    type="text"
                                                    name="feedback"
                                                    id="feedback"
                                                    value={this.state.feedback}
                                                    onChange={this.handleChanged.bind(this)}
                                                    placeholder="Enter Your review"
                                                />
                                            </FormGroup>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => this.handleClose()}>
                                            Cancel
                                    </Button>
                                        <Button variant="primary" onClick={() => this.addReview()}>
                                            Add Reviews
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="w-100"></div>

                        </div>
                    </ListGroup.Item>

                </ListGroup>
                <Footer />
            </>
        );
    }
};
const mapStateToProp = (state) => {
    return {
        products: state.Product.products,
        images: state.Product.images,
        error: state.Order.error,
        token: state.User.token,
        userId: state.User.userId,
    };
};

const mapStateToAction = (dispatch) => {
    return {
        productDetails: (pid) => dispatch(actions.productDetails(pid)),
        addToCart: (pid, qty, id) => dispatch(Orderactions.addToCart(pid, qty, id)),
        addReview: (review) => dispatch(actions.addReview(review))
    }
};

export default connect(mapStateToProp, mapStateToAction)(withRouter(Product));
