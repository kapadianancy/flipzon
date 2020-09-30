import React, { Component } from "react";
import img from '../../../images/product.png';
import {ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import * as actions from '../../redux-store/Actions/ProductAction';

class Product extends Component
{

    // componentDidMount()
    // {
    //     // alert(this.props.match.params.cid);
    //     this.props.getProducts(this.props.match.params.cid);
        
    // }
    // componentDidUpdate()
    // {
    //     this.props.getProducts(this.props.match.params.cid);
    // }
    
    render()
    {
        // let data=[];
        // if(this.props.products.length==0)
        // {
        //     data.push(
        //         <div style={{margin:"auto",marginBottom : '100px',marginTop:'50px'}}>
        //             <h1>No data Found</h1>
        //         </div>
        //     )
        // }
        // else{
            
        //     this.props.products.map(p=>
        //     {
        //         data.push(
        //         <ListGroup.Item id={p.id}>
        //             <div class="card flex-row flex-wrap">
        //                 <div class="card-header border-0">
        //                     <img src={img} alt="image"/>
        //                 </div>
        //                 <div class="card-block px-2">
        //         <h4 class="card-title">{p.name}</h4>
        //         <p class="card-text">Description : {p.description}</p>
        //         <p class="card-text">Price : {p.price}</p>
                        
        //                 <a class="btn btn-primary" style={{backgroundColor:"#fb641b",margin:"10px"}}>Add to Cart</a>
                       
        //                 </div>
        //                 <div class="w-100"></div>        
                        
        //             </div>
        //             </ListGroup.Item>
        //         );
        //         return data;
        //     })
        // }
    
  return (
      <>
      <Header/>
    <ListGroup style={{width:"80%",margin:"20px auto"}}>
    <ListGroup.Item id="1">
                    <div class="card flex-row flex-wrap">
                        <div class="card-header border-0">
                            <img src={img}  alt="image" height="300px"/>
                             <div style={{marginTop:"25px"}}>
                             <img src={img}  alt="image" height="80px" style={{margin:"0px 5px"}}/>
                             <img src={img}  alt="image" height="80px" style={{margin:"0px 5px"}}/>
                             <img src={img}  alt="image" height="80px" style={{margin:"0px 5px"}}/>
                            </div>   
                            
                        </div>
                        <div class="card-block px-2" style={{padding:"20px",margin:"20px"}}>
                <h4 class="card-title">temp data</h4>
                <p class="card-text">Description : temp data</p>
                <p class="card-text">Price : temp data</p>
                        
                        <a class="btn btn-primary" style={{backgroundColor:"#fb641b",margin:"10px"}}>Add to Cart</a>
                       
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
// const mapStateToProp=(state)=>
// {
//     return {
//         products:state.Product.products
//     }
// }

// const mapStateToAction=(dispatch)=>
// {
//     return{
//         getProducts:(cid)=>dispatch(actions.categoryWiseProduct(cid))
//     }
    
// }

export default connect(null,null)(Product);