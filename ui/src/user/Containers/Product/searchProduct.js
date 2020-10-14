import React, { Component } from "react";
import img from '../../../images/product.png';
import { ListGroup, Button, Row, Form,Card,Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import * as actions from '../../redux-store/Actions/ProductAction';
import * as Orderactions from '../../redux-store/Actions/OrderAction';

class Product extends Component {

    state = {
        qty: 1
    }
    async componentDidMount() {
        let text=this.props.match.params.text;
        //alert(text);
        await this.props.getProducts(text);
        //alert(this.props.products);
    }

    async componentDidUpdate() {
        let text=this.props.match.params.text
        await this.props.getProducts(text);
    }
    
    makeid() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 6; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
     addToCart = async (pid, qty) => {
         // localStorage.removeItem("device");
     
         let id;
         if (this.props.token == "") {
           if (localStorage.getItem("device") == null) {
          
             id = this.makeid();
            localStorage.setItem("device", id);        
          }
          else
          {
              id=localStorage.getItem("device");
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
        this.props.history.push("/viewordercart");
      };
    

   


    clickHandler = (pid) => {
        this.props.history.push("/productDetails/" + pid);
    }

    handleChange = (event) => {
        this.setState({
            qty: event
        })
    }


    render() {
        const style = {
            cardBtn: {
                alignSelf: "center",
                backgroundColor: "#fb641b",
                borderColor: "#fb641b",
                margin: "10px",
                color: "white",
                display: "inline-block",
              },
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

                let disable = false;
                let x;
                if (p.stock === 0) {
                    disable = true
                    x = "Out Of Stock";
                }

                data.push(
                    <Card
            style={{ display: "inline-block", width: "30%", margin: "10px" }}
          >
            <Form>
              <div
                class="card flex-row flex-wrap"
                style={{ justifyContent: "center", height: "376px" }}
              >
                <div class="card-header border-0">
                  <img
                    src={`http://localhost:8080${p.main_image}`}
                    height="150px"
                    width="100%"
                    alt="image"
                  />
                </div>
                <div class="card-block px-2">
                  <h4 class="card-title">{p.name}</h4>

                  {p.discount ? (
                    <Card.Text>
                      Price-&#x20B9;{p.price-(p.price * p.discount) / 100}{" "}
                      <Badge pill variant="success">
                        Disc-{p.discount}%
                      </Badge>
                    </Card.Text>
                  ) : (
                    <Card.Text>Price-&#x20B9;{p.price} </Card.Text>
                  )}
                  <div className="text-danger">
                    <b>{x}</b>
                  </div>
                  <NumericInput
                    disabled={disable}
                    className="form-control"
                    defaultValue={1}
                    min={1}
                    max={p.stock}
                    step={1}
                    precision={0}
                    size={5}
                    mobile
                    onChange={(event) => this.handleChange(event)}
                  />

                  <Button
                    disabled={disable}
                    id={p.id}
                    style={style.cardBtn}
                    onClick={() => this.addToCart(p.id, this.state.qty)}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    style={style.cardBtn}
                    onClick={() => this.clickHandler(p.id)}
                  >
                    View Details
                  </Button>
                </div>
                <div class="w-100"></div>
              </div>
            </Form>
          </Card>
                );
                return data;
            })
        }

        return (
            <>
                <Header />
        <div style={{ margin: "30px 30px" }}>
          <Row style={{ justifyContent: "center" }}>{data}</Row>
        </div>
        <Footer />
            </>
        );
    }
};
const mapStateToProp = (state) => {
    return {
        products: state.Product.products,
        error: state.Order.error,
        token: state.User.token,
        userId:state.User.userId
    }
}

const mapStateToAction = (dispatch) => {
    return {
        getProducts: (text) => dispatch(actions.searchProduct(text)),
        addToCart: (pid, qty,id) => dispatch(Orderactions.addToCart(pid, qty,id))
    }

}


export default connect(mapStateToProp, mapStateToAction)(Product);