import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { useReactToPrint } from 'react-to-print'

import * as classes from './Products.module.css'
import ProductList from '../components/Product/ProductList/ProductList';
import { fetchProducts, deleteProduct, searchProducts } from '../store/actions/ProductActions'

const renderPaginationItems = (total, active, changeActive) => {
    let items = [];
    for(let i=1;i<=total;i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}

const Products = (props) => {
    const [perPage, setPerPage] = useState(5)
    const [active, setActive] = useState(1)
    const [searchText, setSearchText] = useState("");
    const { fetchProducts } = props;
    useEffect(() => {
        fetchProducts(active, perPage);
    }, [fetchProducts, active, perPage]);

    const searchProducts = () => {
        props.searchProducts(searchText);
    }
    const changeActive = (index) => {
        setActive(index);
    }
    const printBlockRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printBlockRef.current,
    });
    
    let productData = <Spinner animation="border" />;
    if(!props.loading && props.products) {
        productData = <ProductList deleteProduct={props.deleteProduct} printBlockRef={printBlockRef} active={(active-1) * perPage} products={props.products} />
    }

    return(
        <>
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product List
                    </div>
                    <div className="input-group" style={{ maxWidth: "400px" }}>
                        <input type="text" className="form-control" placeholder="Product Name" value={searchText} onChange={ (e) => setSearchText(e.target.value) } />
                        <div className="input-group-append" id="button-addon4">
                            <Button variant="outline-success" onClick={() => searchProducts()}>Search</Button>
                            <Button variant="outline-secondary" onClick={ () => props.fetchProducts()}>Show All</Button>
                            <Button as={Link} to={`${props.match.path}/add`} variant="outline-primary">Add New</Button>
                            <Button onClick={handlePrint} variant="outline-info">Print</Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    {  productData }
                </Card.Body>
                <Card.Footer className={classes.Footer}>
                    {
                        props.products ?
                        <Pagination className={classes.Pagination} >
                            { renderPaginationItems(props.total, active, changeActive) }
                        </Pagination> : null
                    }
                    <Form.Control as="select" value={perPage} custom className={classes.Select} onChange={ (e) => { setActive(1);setPerPage(e.target.value) } }>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </Form.Control>
                </Card.Footer>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.adminProduct.products,
        total: state.adminProduct.total,
        loading: state.adminProduct.loading,
        error: state.adminProduct.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: (page, limit) => dispatch(fetchProducts(page, limit)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        searchProducts: (text) => dispatch(searchProducts(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);