import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import * as classes from './ProductFormController.module.css'
import { addProduct, fetchOneProduct, editProduct, deleteProductImage } from '../store/actions/ProductActions'
import { fetchProductCategories } from '../store/actions/Product_CategoriesActions'
import ProductForm from '../components/Product/ProductForm/ProductForm'

const ProductFormController = (props) => {
    useEffect( () => {
        props.fetchProductCategories();
        if(props.match.params.id) {
            props.fetchOneProduct(props.match.params.id);
        }
    }, [props.match.params.id, props.fetchProductCategories, props.fetchOneProduct]);
    const addProduct = async (formData) => {
        await props.addProduct(formData);
        props.history.push("/admin/products");
    }
    const editProduct = async (formData) => {
        await props.editProduct(props.match.params.id, formData);
        props.history.push("/admin/products");
    }
    return (
        <>
            <Card>
            <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        { props.match.params.id ?  "Edit Product" : "Add Product" }
                    </div>
                    <Button as={Link} to="/admin/products" variant="primary">Show All</Button>
                </Card.Header>
                <Card.Body>
                    <ProductForm 
                        categories={props.categories}
                        deleteProductImages={props.deleteProductImages}
                        addProduct={addProduct} 
                        product={props.product} 
                        edit={props.match.params.id ? true : false} 
                        editProduct={editProduct} 
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
        loading: state.adminProduct.loading,
        error: state.adminProduct.error,
        product: state.adminProduct.product,
        categories: state.adminProductCategories.product_categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (productData) => dispatch(addProduct(productData)),
        fetchOneProduct: (id) => dispatch(fetchOneProduct(id)),
        editProduct: (id, productData) => dispatch(editProduct(id, productData)),
        deleteProductImages: (ids) => dispatch(deleteProductImage(ids)),
        fetchProductCategories: () => dispatch(fetchProductCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormController)