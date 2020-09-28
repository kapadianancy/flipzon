import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'

import * as classes from './Products.module.css'
import ProductList from '../components/Product/ProductList/ProductList';
import { fetchProducts, deleteProduct } from '../store/actions/ProductActions'

const renderPaginationItems = (total, active, limit, changeActive) => {
    let items = [];
    for(let i=1;i<=Math.ceil(total/limit);i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}

const Products = (props) => {
    const perPage = 2;
    const [active, setActive] = useState(1)
    useEffect(() => {
        props.fetchProducts();
    }, [props.fetchProducts]);
    const changeActive = (index) => {
        setActive(index);
    }
    let productData = "Loading";
    if(props.products.length > 0) {
        productData = [
            <ProductList key={1} deleteProduct={props.deleteProduct} active={active} perPage={perPage} products={props.products} />,
            <Pagination key={2} >
                { renderPaginationItems(props.products.length, active, perPage, changeActive) }
            </Pagination>
        ]
    }
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
                    {  productData }
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