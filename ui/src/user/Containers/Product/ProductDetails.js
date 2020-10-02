import React, { Component } from "react";
import img from '../../../images/product.png';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import * as actions from '../../redux-store/Actions/ProductAction';

class Product extends Component {

    state = {
        id: "",
        name: "",
        price: "",
        description: "",
        main_image: ""
    }

    async componentDidMount() {
        await this.props.productDetails(this.props.match.params.pid);

        this.setState({
            id: this.props.products.id,
            name: this.props.products.name,
            description: this.props.products.description,
            price: this.props.products.price,
            main_image: this.props.products.main_image
        })

    }


    render() {

        let data = [];
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
                                <h4 class="card-title" style={{color: "#fb641b"}}>{this.state.name}</h4>
                                <p class="card-text"><b>Description :</b> {this.state.description}</p>
                                <p class="card-text"><b>Price :  </b>{this.state.price}</p>

                                <a class="btn btn-primary" style={{ backgroundColor: "#fb641b", margin: "10px" }}>Add to Cart</a>

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
        images: state.Product.images
    }
}

const mapStateToAction = (dispatch) => {
    return {
        productDetails: (pid) => dispatch(actions.productDetails(pid))
    }

}

export default connect(mapStateToProp, mapStateToAction)(withRouter(Product));