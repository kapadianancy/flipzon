import React, { Component } from "react";
import img from '../../../images/product.png';
import { ListGroup,Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NumericInput from 'react-numeric-input';

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
        qty: 1
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
        if (this.props.token == "") {
            this.props.history.push("/login");
        }
        else {
            await this.props.addToCart(pid, qty);
            if (this.props.error !== "") {
                this.props.history.push("/error/" + this.props.error);
            }
            this.props.history.push("/viewordercart");
        }
    }

    handleChange = (event) => {
        this.setState({
            qty: event
        })
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
        let error="";
        if (this.props.products.stock == 0) {
            disable= true;
            error="Out Of Stock";
       
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
                                <p class="card-text"><b>Price :  </b>{this.state.price}</p>
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
                                <Button disabled={disable} id={this.state.id} style={style.cardBtn} onClick={() => this.addToCart(this.state.id, this.state.qty)}>Add To Cart</Button>

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
        token: state.User.token
    }
}

const mapStateToAction = (dispatch) => {
    return {
        productDetails: (pid) => dispatch(actions.productDetails(pid)),
        addToCart: (pid, qty) => dispatch(Orderactions.addToCart(pid, qty))
    }

}

export default connect(mapStateToProp, mapStateToAction)(withRouter(Product));