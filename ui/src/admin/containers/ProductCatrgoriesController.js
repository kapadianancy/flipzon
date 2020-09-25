import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import * as classes from './ProductFormController.module.css'
import { AddProductCategories, SingleProductCategories } from '../store/actions/Product_CategoriesActions'
import ProductForm from '../components/ProductCategories/ProductCategoriesForm/ProductCategoriesForm'

const ProductCatrgoriesController = (props) => {
    useEffect( () => {
        if(props.match.params.id) {
            props.SingleProductCategories(props.match.params.id);
        }
    }, [props.match.params.id]);
    
    const AddProductCategories = async (formData) => {
        await props.addProduct(formData);
        props.history.push("/admin/ProductCategories");
    }
    
    const editProductCategories = async (formData) => {
        props.history.push("/admin/ProductCategories");
    }
    return (
        <>
            <Card>
            <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        { props.match.params.id ?  "Edit Product" : "Add Product" }
                    </div>
                    <Button as={Link} to="/admin/ProductCategories" variant="primary">Show All</Button>
                </Card.Header>
                <Card.Body>
                    <ProductForm 
                        AddProductCategories={AddProductCategories} 
                        product_categories={props.product_categories} 
                        edit={props.match.params.id ? true : false} 
                        editProductCategories={editProductCategories} 
                        loading={props.loading} 
                        error={props.error} 
                    />
                </Card.Body>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        product_categories: state.adminProductCategories.product_categories,
        loading: state.adminProductCategories.loading,
        error: state.adminProductCategories.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddProductCategories: (post) => dispatch(AddProductCategories(post)),
        //addProduct: (productData) => dispatch(addProduct(productData)),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatrgoriesController)