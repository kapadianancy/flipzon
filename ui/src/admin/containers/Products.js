import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import * as classes from './Products.module.css'
import ProductList from '../components/Product/ProductList/ProductList';
import { fetchProducts, deleteProduct } from '../store/actions/ProductActions'

const Products = (props) => {
    useEffect(() => {
        props.fetchProducts();
    }, [])
    return(
        <>
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product List
                    </div>
                    <Button as={Link} to={`${props.match.path}/add`} variant="primary">Add New</Button>
                </Card.Header>
                <Card.Body>
                    <ProductList deleteProduct={props.deleteProduct} products={props.products} />
                </Card.Body>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.adminProduct.products,
        loading: state.adminProduct.loading,
        error: state.adminProduct.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (id) => dispatch(deleteProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);