import React, { useEffect,useState } from 'react';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import ProductCategoriesList from '../components/ProductCategories/ProductCategoriesList';
import { fetchProductCategories,searchCategories } from '../store/actions/Product_CategoriesActions'
const renderPaginationItems = (total, active, limit, changeActive) => {
    let items = [];
    for(let i=1;i<=Math.ceil(total/limit);i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}
const ProductCategorie = (props) => {
    const perPage = 4;
    const [active, setActive] = useState(1);
    const [searchText, setSearchText] = useState("");

    useEffect( () => {
        if(props.product_categories.length === 0)
        {
            props.fetchProductCategories()
        }
    }, [props])

    const searchCategories = () => {
        props.searchCategories(searchText);
    }
    const changeActive = (index) => {
        setActive(index);
    }
    let productCategories = "Loading";
    if(props.product_categories.length > 0) {
        productCategories = [
            <ProductCategoriesList key={1} product_categories={props.product_categories} active={active} perPage={perPage}/>,
            <Pagination key={2} >
                { renderPaginationItems(props.product_categories.length, active, perPage, changeActive) }
            </Pagination>
        ]
    }
    return(
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Product Categories List
                </div>
                <div className="input-group" style={{ maxWidth: "400px" }}>
                        <input type="text" className="form-control" placeholder="Category Name" value={searchText} onChange={ (e) => setSearchText(e.target.value) } />
                        <div className="input-group-append" id="button-addon4">
                            <Button variant="outline-success" onClick={() => searchCategories()}>Search</Button>
                            <Button variant="outline-secondary" onClick={() => props.fetchProductCategories()}>Show All</Button>
                            <Button as={Link} to="/admin/ProductCategoriesAdd" variant="outline-primary">Add New</Button>
                        </div>
                    </div>

            </Card.Header>
            <Card.Body>
                {productCategories}
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
        fetchProductCategories: () => dispatch(fetchProductCategories()),
        searchCategories: (text) => dispatch(searchCategories(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategorie);
