import React, { Component } from 'react';
import { Card, Button, Carousel, CardDeck, CardGroup } from 'react-bootstrap';
import { connect } from "react-redux";
import * as actions from "../../redux-store/Actions/ProductAction";
import { withRouter } from 'react-router';
import Product from '../../../images/product.png';
import Product1 from '../../../images/product-2.jpg';

class CategorySlider extends Component {

    componentDidMount() {
        this.props.fetchProductCategories();
    }

    clickHandler = (cid) => {
        this.props.history.push("/product/" + cid);
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
        };

        let category = [];
        let c = this.props.Categories;
        let n = this.props.Categories.length;

        let card = (j) => {
            return (
                <Card
                    key={c[j].id}
                    style={{ width: "18rem", padding: "10px", display: "inline-block" }}
                >
                    <Card.Img variant="top" height="177px" width="266px" src={`http://localhost:8080${c[j].image}`} />
                 
                    <Card.Body>
                        <Card.Title>{c[j].name}</Card.Title>
                        {/* <Card.Text>{c[j].description}</Card.Text> */}
                        <Button style={style.cardBtn} onClick={() => this.clickHandler(c[j].id)}>View Product</Button>

                    </Card.Body>
                </Card>
            );
        };

        for (let j = 0; j < n;) {

            category.push(
                <Carousel.Item>
                    {card(j++)}

                    {(j >= n) ? null : card(j++)}

                    {(j >= n) ? null : card(j++)}

                    {(j >= n) ? null : card(j++)}

                </Carousel.Item>
            );

            // return category;
        }

        return (
            <div style={{ padding: "20px" }}>
                <h2 style={{ padding: "10px" }}>Categories</h2>

                <Carousel>{category}</Carousel>


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        Categories: state.ProductCategory.product_categories,
    };
};

const mapStateToAction = (dispatch) => {
    return {
        fetchProductCategories: () => dispatch(actions.fetchProductCategories()),
    };
};

export default connect(mapStateToProps, mapStateToAction)(withRouter(CategorySlider));