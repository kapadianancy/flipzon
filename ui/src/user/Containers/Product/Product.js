import React, { Component } from "react";
import img from '../../../images/product.png';
import {ListGroup} from 'react-bootstrap';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
class Product extends Component
{
    render()
    {

    
  return (
      <>
      <Header/>
    <ListGroup style={{width:"80%",margin:"20px auto"}}>
        <ListGroup.Item>
     <div class="card flex-row flex-wrap">
        <div class="card-header border-0">
            <img src={img} alt=""/>
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Description</p>
            <a href="#" class="btn btn-primary" style={{backgroundColor:"#fb641b"}}>Add to Cart</a>
        </div>
        <div class="w-100"></div>        
        
    </div>
    </ListGroup.Item>

    <ListGroup.Item>
     <div class="card flex-row flex-wrap">
        <div class="card-header border-0">
            <img src={img} alt=""/>
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Description</p>
            <a href="#" class="btn btn-primary" style={{backgroundColor:"#fb641b"}}>Add to Cart</a>
        </div>
        <div class="w-100"></div>        
        
    </div>
    </ListGroup.Item>
    </ListGroup>
    <Footer/>
    </>
  );
    }
};

export default Product;