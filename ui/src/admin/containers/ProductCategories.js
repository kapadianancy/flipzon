import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import { Link } from 'react-router-dom';

import ProductCategoriesList from '../components/ProductCategories/ProductCategoriesList';
import { fetchProductCategories } from '../store/actions/Product_CategoriesActions'
const ProductCategorie = (props) => {
    useEffect( () => {
        if(props.product_categories.length === 0)
        {
            props.fetchProductCategories()
        }
    }, [props])
    return(
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Product Categories List
                </div>
                <Button as={Link} to="/admin/ProductCategoriesAdd" variant="primary">Add New</Button>
            </Card.Header>
            <Card.Body>
                <ProductCategoriesList product_categories={props.product_categories}/>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        product_categories: state.adminProductCategories.product_categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductCategories: () => dispatch(fetchProductCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategorie);
