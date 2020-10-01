import React, { Component } from "react";
import img from '../../../images/product.png';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import * as actions from '../../redux-store/Actions/ProductAction';

class Product extends Component {

    componentDidMount() {
        // alert(this.props.match.params.cid);
        this.props.getProducts(this.props.match.params.cid);

    }
    componentDidUpdate() {
        this.props.getProducts(this.props.match.params.cid);
    }

    clickHandler = (pid) => {

        this.props.history.push("/productDetails/" + pid);
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
        if (this.props.products.length == 0) {
            data.push(
                <div style={{ margin: "auto", marginBottom: '100px', marginTop: '50px' }}>
                    <h1>No data Found</h1>
                </div>
            )
        }
        else {

            this.props.products.map(p => {
                data.push(
                    <ListGroup.Item id={p.id}>
                        <div class="card flex-row flex-wrap">
                            <div class="card-header border-0">
                                <img src={`http://localhost:8080${p.main_image}`} height="150px" width="200px" alt="image" />
                            </div>
                            <div class="card-block px-2">
                                <h4 class="card-title">{p.name}</h4>
                                <p class="card-text">Description : {p.description}</p>
                                <p class="card-text">Price : {p.price}</p>

                                <Button style={style.cardBtn} onClick={() => this.clickHandler(p.id)}>Add To Cart</Button>
                                <Button style={style.cardBtn} onClick={() => this.clickHandler(p.id)}>View Deatails</Button>
                            </div>
                            <div class="w-100"></div>

                        </div>
                    </ListGroup.Item>
                );
                return data;
            })
        }

        return (
            <>
                <Header />
                <ListGroup style={{ width: "80%", margin: "20px auto" }}>
                    {data}

                </ListGroup>
                <Footer />
            </>
        );
    }
};
const mapStateToProp = (state) => {
    return {
        products: state.Product.products
    }
}

const mapStateToAction = (dispatch) => {
    return {
        getProducts: (cid) => dispatch(actions.categoryWiseProduct(cid))
    }

}


export default connect(mapStateToProp, mapStateToAction)(Product);