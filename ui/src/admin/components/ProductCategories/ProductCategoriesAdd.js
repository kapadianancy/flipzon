import React, { Component } from 'react';
// import axios from 'axios';
import { Form} from 'react-bootstrap'
// import * as classes from './ProductList.module.css';
// import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as classes from '../../containers/Products.module.css'
import { AddProductCategories } from '../../store/actions/Product_CategoriesActions'

class ProductCategoriesAdd extends Component{
    state = {
        name:"",
        description:""
    }
    componentDidMount(){
        console.log(this.props);
    }
    postDataHandler = (e) =>{
        e.preventDefault();
        const post = {
            name:this.state.name,
            description:this.state.description
        }   
        this.props.AddProductCategories(post);
        this.setState({
            name: '',
            description: ''
        })
        this.props.history.replace('/admin/product_categories');
        // axios.post("http://localhost:8080/admin/product_categories",post)
        // .then(response=>{
        //     this.props.history.replace('/admin/product_categories');
        //     console.log(response);
        // });
    }
    render(){
        return(
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product Categories Add
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} placeholder="Enter Category" />
                    <Form.Label>Description</Form.Label>
                    <Form.Control rows="4" type="text" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} placeholder="Enter Description" />
                    <Button onClick={this.postDataHandler} variant="primary">
                        Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        ) 
    }
}

//export default ProductCategoriesList;
const mapStateToProps = (state) => ({
    product_categories: state.adminProductCategories.product_categories
});

const mapDispatchToProps = dispatch => {
    return{
        AddProductCategories: (post) => dispatch(AddProductCategories(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesAdd);