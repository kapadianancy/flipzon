import React, { Component } from "react";
import { Card, Button, Carousel, CardDeck, CardGroup } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../redux-store/Actions/ProductAction";
import Product from "../../../images/product.png";
import Product1 from "../../../images/product-2.jpg";
import { Row, Col } from "reactstrap";

class ProductSlider extends Component {
  componentDidMount() {
    this.props.orderedProducts();
  }
  render() {
    const style = {
      backgroundColor: "#fb641b",
    };

    let products = [];
    let p = this.props.products;
    let n = this.props.products.length;
    let i=0;

    
    for (let j = 0; j < n-1;j++) {
        products.push(
                <Carousel.Item>
                  <Card
                    key={p[j].id}
                    style={{ width: "18rem", padding: "10px", display: "inline-block" }}
                  >
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                      <Card.Title>{p[j].name}</Card.Title>
                      <Card.Text>{p[j].description}</Card.Text>
                      <Button style={style} variant="primary">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>

                 <Card
                    key={p[j++].id}
                    style={{ width: "18rem", padding: "10px", display: "inline-block" }}
                  >
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                      <Card.Title>{p[j].name}</Card.Title>
                      <Card.Text>{p[j].description}</Card.Text>
                      <Button style={style} variant="primary">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>

                  {/* <Card
                    key={p[j++].id}
                    style={{ width: "18rem", padding: "10px", display: "inline-block" }}
                  >
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                      <Card.Title>{p[j].name}</Card.Title>
                      <Card.Text>{p[j].description}</Card.Text>
                      <Button style={style} variant="primary">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card> */}

                 

                </Carousel.Item>
              );
              
       
      
      

      //return products;
    }

    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ padding: "10px" }}>Most Ordered Products</h2>

        <Carousel>{products}</Carousel>

        {/* <Card style={{ width: '18rem',padding:"10px"}}>
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                        
                        </Card.Text>
                        <Button style={style} variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card> */}

        {/* <Card style={{ width: '18rem',padding:"10px"}}>
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                        
                        </Card.Text>
                        <Button style={style} variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card> 
            </CardGroup>
          </Carousel.Item>
        </Carousel> */}
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

export default connect(mapStateToProps, mapStateToAction)(ProductSlider);
