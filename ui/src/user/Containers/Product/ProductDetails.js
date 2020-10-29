import React, { Component } from "react";
import img from "../../../images/product.png";
import { ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NumericInput from "react-numeric-input";
import Modal from "react-bootstrap/Modal";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ReactStars from "react-rating-stars-component";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import { Badge, Card } from "react-bootstrap";
import ReactImageMagnify from 'react-image-magnify';
import ModalImage from "react-modal-image";


import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import * as actions from "../../redux-store/Actions/ProductAction";
import * as Orderactions from "../../redux-store/Actions/OrderAction";
import star from "../../../images/star.png";

import "./product.css";

class Product extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    discount: "",
    description: null,
    stock: "",
    main_image: "",
    qty: 1,
    show: false,
    feedback: "",
    rating: 1,
    reviews: [],
    i: 1,
    specification: [],
    modal_image:""
  };

  async componentDidMount() {
    await this.props.productDetails(this.props.match.params.pid);
    await this.props.getReviews(this.props.match.params.pid);
    await this.props.getSpecificationByProduct(this.props.match.params.pid)

    this.setState({
      id: this.props.products.id,
      name: this.props.products.name,
      description: this.props.products.description,
      price: this.props.products.price,
      discount: this.props.products.discount,
      stock: this.props.products.stock,
      main_image: this.props.products.main_image,
      reviews: this.props.reviews,
      specification: this.props.specification,
      modal_image: this.props.products.main_image
    });
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
      } else {
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
    } else {
      this.props.history.push("/viewordercart");
    }
  };

  handleShow = async () => {
    if (this.props.token !== "") {
      this.setState({ show: true });
    } else {
      this.props.history.push("/login");
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleChange = (event) => {
    this.setState({
      qty: event,
    });
  };
  handleChanged(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }
  linkClick(len) {
    this.setState({
      i: len
    });
  }

  imageClick(img){
    this.setState({
      modal_image:img
    });
  }

  onStarClick(event) {
    this.setState({ rating: event });
  }

  addReview = async () => {
    const review = {
      review: this.state.feedback,
      rating: this.state.rating,
      productId: this.state.id,
    };
    await this.props.addReview(review);
    if (this.props.error !== "") {
      this.props.history.push("/error/" + this.props.error);
    }
    this.setState({ show: false });
    await this.props.getReviews(this.state.id);
    this.setState({
      reviews: this.props.reviews,
    });
  };

  render() {
    const style = {
      cardBtn: {
        alignSelf: "center",
        backgroundColor: "#fb641b",
        borderColor: "#fb641b",
        margin: "10px",
        marginTop: "30px",
        color: "white",
        display: "inline-block",
        width: "40%",
      },
      tableTD: {
        border: "1px gray solid",
        padding: "10px",
        margin: "10px"
      },
      videolink: {
        padding: "10px",
        margin: "10px"
      },
      linkBtn: {
        alignSelf: "center",
        backgroundColor: "white",
        borderColor: "white",
        color: "#fb641b",
        display: "inline-block",
        textDecoration: "underline"
      }
    };
    let price = (this.state.price - (this.state.price * this.state.discount) / 100).toFixed(2);
    let data = [];
    let specification = [];
    let description = [];
    let disable = false;
    let error = "";
    if (this.props.products.stock == 0) {
      disable = true;
      error = "Out Of Stock";
    }

    if (this.props.products.description !== "") {
      description.push(
        <>
          <h4 style={{ color: "#fb641b", display: "inline-block" }}> Product Description :</h4>
          <div
            id="table-div"
            dangerouslySetInnerHTML={{ __html: this.state.description }}
          ></div>
        </>)
    }
    let j = 0;
    if (this.props.specification.length !== 0) {
      this.props.specification.map(s => {
        if (j < this.state.i) {
          specification.push(
            <>
              <h6>
                <b>
                  {s.title}
                </b>
              </h6>
              <div
                id="table-div"
                dangerouslySetInnerHTML={{ __html: s.details }}
              ></div>
            </>

          )
        }
        j = j + 1;
        return specification
      })

      if (j != specification.length) {
        specification.push(
          <Button
            style={style.linkBtn}
            onClick={() =>
              this.linkClick(specification.length + 1)
            }
          >Read More</Button>)
      }

    }
    else {
      specification.push(<tr><td><b>-</b></td></tr>)
    }
    data.push(
      <img
        src={`http://localhost:8080${this.state.main_image}`}
        alt="image"
        width="100px"
        height="100px"
        style={{ margin: "0px 5px" }}
        onClick={()=>{this.imageClick(this.state.main_image)}}
      />
    );
    this.props.images.map((p) => {
      data.push(
        <img
          src={`http://localhost:8080${p.image}`}
          alt="image"
          width="100px"
          height="100px"
          style={{ margin: "0px 5px" }}
          onClick={()=>{this.imageClick(p.image)}}
        />
      );
      return data;
    });

    if (this.props.products.videoLink !== "") {
      data.push(
        <iframe src={this.props.products.videoLink}
          frameborder='0'
          style={style.videolink}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
          title='video'
        />
      )
    }


    let rating;
    let sum = 0;
    this.state.reviews.map((r) => {
      sum += r.rating;
    });
    rating = sum / this.state.reviews.length;

    let rdata = [];
    this.state.reviews.map((r) => {

      const date = new Date(Date.parse(r.createdAt)).toString().split("G");
      let price = ((this.state.price) - (this.state * this.state.discount) / 100).toFixed(2);


      rdata.push(
        <Card
          style={{
            width: "50%",
            padding: "10px",
            display: "block",
            width: "100%",
          }}
        >
          <Card.Body>
            <Card.Text>
              <Badge pill variant="success">
                {r.rating + " "}
                <img src={star} height="10px" width="10px" />
              </Badge>
              <br />
              <b>{r.review}</b>

              <p style={{ color: "gray", fontSize: "14px" }}> Flipkart cutomer- {date[0]}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      );
      return rdata;
    });

    return (
      <>
        <Header />
        <ListGroup style={{ width: "80%", margin: "20px auto" }}>
          <ListGroup.Item id="1" style={{ minHeight: "800px" }}>
            <div class="card flex-row flex-wrap" style={{ minHeight: "1100px" }}>
              <div
                class="card-header border-0"
                style={{ height: "355px", width: "40%" }}
              >

                {/* <img
                  src={`http://localhost:8080${this.state.main_image}`}
                  alt="image"
                  height="100%"
                  width="100%"
                /> */}


                <ModalImage
                  small={`http://localhost:8080${this.state.modal_image}`}
                  large={`http://localhost:8080${this.state.modal_image}`}
                  hideDownload="true"
                  imageBackgroundColor="transparent "
                />
                <div style={{ marginTop: "25px" }}>
                  {data}
                </div>
                <div style={{ width: "100%" }}>
                  <Button
                    disabled={disable}
                    id={this.state.id}
                    style={style.cardBtn}
                    onClick={() =>
                      this.addToCart(this.state.id, this.state.qty)
                    }
                  >
                    Add To Cart
                  </Button>
                  <Button
                    style={style.cardBtn}
                    onClick={() => this.handleShow()}
                  >
                    Give Review
                  </Button>
                </div>
              </div>
              <div
                class="card-block px-2"
                style={{ marginLeft: "20px", textAlign: "left", width: "50%", minHeight: "700px" }}
              >
                <h1
                  class="card-title"
                  style={{ color: "#fb641b", display: "inline-block" }}
                >
                  {this.state.name}
                </h1>
                &nbsp;
                {this.state.discount != 0 ? (
                  <Badge pill variant="success">
                    in offer
                  </Badge>
                ) : null}
                <p class="card-text">
                  <b>Payabale amount </b>{" "}
                  <h4>
                    ₹{" "}
                    {price}
                  </h4>
                  {this.state.discount != 0 ?
                    (<><strike>₹ {this.state.price} </strike>
                      <br />
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {this.state.discount}% off
                  </span></>) : null}
                </p>
                <div className="text-danger" style={{ marginLeft: "80px" }}>
                  <b>{error}</b>
                </div>
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
                <hr />

                {/* <p class="card-text">
                   <h4 style={{ color: "#fb641b", display: "inline-block" }}> Product Description :</h4>
                  <div
                    id="table-div"
                    dangerouslySetInnerHTML={{ __html: this.state.description }}
                  ></div>
                </p>*/}
                {description}
                <p class="card-text">
                  <h4 style={{ color: "#fb641b", display: "inline-block" }}> Product Specification :</h4>

                  {/* <table width="100%">
                    {specification}
                  </table> */}

                  {specification}
                </p>

              </div>

              {this.state.reviews.length != 0 ?
                (<div class="w-100" style={{ textAlign: "left", margin: "10px" }}>
                  <hr />
                  <h4 style={{ display: "inline-block", color: "#fb641b" }}>
                    Reviews and Ratings &nbsp;
                  {this.state.reviews.length != 0 ? (
                      <Badge pill variant="success">
                        {rating + " "}
                        <img src={star} height="20px" width="20px" />
                      </Badge>
                    ) : null}
                  </h4>
                  {rdata}
                </div>) : null}
            </div>
            <Modal show={this.state.show}>
              <Modal.Header>
                <Modal.Title style={{ color: "#fb641b" }}>
                  Your Review
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div class="card flex-row flex-wrap">
                    <div class="card-header">
                      <img
                        src={`http://localhost:8080${this.state.main_image}`}
                        alt="image"
                        height="50px"
                        width="50px"
                      />
                    </div>
                    <div class="px-2">
                      <h4 class="card-title">{this.state.name}</h4>
                      <p class="card-text">
                        <b>Price : </b>
                        {price}
                      </p>
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
          </ListGroup.Item>
        </ListGroup>
        <Footer />
      </>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    products: state.Product.products,
    images: state.Product.images,
    error: state.Order.error,
    token: state.User.token,
    userId: state.User.userId,
    reviews: state.Product.review,
    specification: state.Product.specification
  };
};

const mapStateToAction = (dispatch) => {
  return {
    productDetails: (pid) => dispatch(actions.productDetails(pid)),
    addToCart: (pid, qty, id) => dispatch(Orderactions.addToCart(pid, qty, id)),
    addReview: (review) => dispatch(actions.addReview(review)),
    getReviews: (pid) => dispatch(actions.getReviews(pid)),
    getSpecificationByProduct: (pid) => dispatch(actions.getSpecificationByProduct(pid))
  };
};

export default connect(mapStateToProp, mapStateToAction)(withRouter(Product));
