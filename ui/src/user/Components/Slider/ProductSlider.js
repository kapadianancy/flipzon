import React, { Component } from "react";
import { Card, Button, Carousel, CardDeck, CardGroup,Badge } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../redux-store/Actions/ProductAction";
import { withRouter } from "react-router";

class ProductSlider extends Component {
  componentDidMount() {
    this.props.orderedProducts();
  }

  clickHandler = (pid) => {
    this.props.history.push("/productDetails/" + pid);
  };
  render() {
    const style = {
      cardBtn: {
        alignSelf: "center",
        backgroundColor: "#fb641b",
        borderColor: "#fb641b",
        margin: "10px",
        color: "white",
        width: "170px",
      },
    };

    let products = [];
    let p = this.props.products;
    let n = this.props.products.length;
    let price;
    let card = (j) => {
      price=(p[j].price - (p[j].price * p[j].discount) / 100).toFixed(2);
      return (
        <Card
          key={p[j].id}
          style={{ width: "18rem", padding: "10px", display: "inline-block" }}
        >
          <Card.Img
            variant="top"
            height="177px"
            width="266px"
            src={`http://localhost:8080${p[j].main_image}`}
          />
          <Card.Body>
            <Card.Title>{p[j].name}</Card.Title>
            {p[j].discount ? (
              <Card.Text>
                Price-&#x20B9;{price}{" "}
                <Badge pill variant="success">
                  Disc-{p[j].discount}%
                </Badge>
              </Card.Text>
            ) : (
              <Card.Text>Price-&#x20B9;{p[j].price} </Card.Text>
            )}

            <Button
              style={style.cardBtn}
              onClick={() => this.clickHandler(p[j].id)}
            >
              View Details
            </Button>
          </Card.Body>
        </Card>
      );
    };

    for (let j = 0; j < n; ) {
      products.push(
        <Carousel.Item>
          {card(j++)}

          {j >= n ? null : card(j++)}

          {j >= n ? null : card(j++)}

          {j >= n ? null : card(j++)}
        </Carousel.Item>
      );

      //return products;
    }

    return (
      <div style={{ padding: "20px" }}>
        {products.length == 0 ? null : (
          <h2 style={{ padding: "10px" }}>Most Ordered Products</h2>
        )}

        <Carousel>{products}</Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.Product.products,
  };
};

const mapStateToAction = (dispatch) => {
  return {
    orderedProducts: () => dispatch(actions.orderedProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapStateToAction
)(withRouter(ProductSlider));
