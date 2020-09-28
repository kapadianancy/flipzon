import React, { Component } from 'react';
import {Card,Button,Carousel,CardDeck,CardGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import * as actions from '../redux-store/Actions/ProductAction';
import Product from '../../images/product.png';
import Product1 from '../../images/product-2.jpg';
 
class ProductSlider extends Component {

    componentDidMount()
    {
        this.props.orderedProducts();
    }
    render() {
        const style={
            backgroundColor:"#fb641b"
        } 

        let products=[];
        this.props.products.map(p=>
            {
                products.push(
                <Card style={{ width: '18rem',padding:"10px"}}>
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Text>
                        {p.description}
                        </Card.Text>
                        <Button style={style} variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>
                )
                return products;
            })
       
        return (
            <div style={{padding:"20px"}}>
                <h2 style={{padding:"10px"}}>Most Ordered Products</h2>
                <Carousel>
                <Carousel.Item>
               <CardGroup>
                {products}
                <Card style={{ width: '18rem',padding:"10px"}}>
                    <Card.Img variant="top" src={Product} />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                        
                        </Card.Text>
                        <Button style={style} variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem',padding:"10px"}}>
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
                </Carousel>    
            </div>
        );
    }
}

const mapStateToProps=(state)=>
{
    return {
        products:state.Product.products
    }
}
 
const mapStateToAction=(dispatch)=>
{
    return {
       
        orderedProducts:()=>dispatch(actions.orderedProducts())
    }
}
 
export default connect(mapStateToProps,mapStateToAction)(ProductSlider);