import React, { useEffect,useState } from 'react';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import * as classes from './Products.module.css'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import ProductCategoriesList from '../components/ProductCategories/ProductCategoriesList';
import { fetchProductCategories,searchCategories } from '../store/actions/Product_CategoriesActions'
import { IoMdAddCircle } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa'
import { HiViewList } from 'react-icons/hi'

const renderPaginationItems = (total, active, changeActive) => {
    
    let items = [];
    for(let i=1;i<=total;i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}
const ProductCategorie = (props) => {
    const [perPage, setPerPage] = useState(5)
    const [active, setActive] = useState(1)
    const [searchText, setSearchText] = useState("");
    const [activePage, setActivePage] = useState(true);
    
    useEffect(() => {
        props.fetchProductCategories(active, perPage);
    }, [props.fetchProductCategories, active, perPage]);

    const searchCategories = () => {
        setActivePage(false);
        props.searchCategories(searchText);
    }
    const changeActive = (index) => {
        setActive(index);
    }
    
    const fetchAll = () => {
        setActivePage(false)
        props.fetchProductCategories() 
    }
    let productCategories = <Spinner animation="border" />;
    if(!props.loading && props.product_categories.length > 0) {
        productCategories = <ProductCategoriesList product_categories={props.product_categories} active={(active-1)*perPage}/>
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
                            <Button variant="outline-success" onClick={() => searchCategories()}><FaSearch /></Button>
                            <Button variant="outline-secondary" onClick={() => fetchAll()}><HiViewList /></Button>
                            <Button as={Link} to="/admin/ProductCategoriesAdd" variant="outline-primary"><IoMdAddCircle /></Button>
                        </div>
                    </div>

            </Card.Header>
            <Card.Body>
                {productCategories}
            </Card.Body>
            <Card.Footer className={classes.Footer}>
                { 
                    activePage === true ?
                    <Pagination className={classes.Pagination} >
                        { renderPaginationItems(props.total, active, changeActive) }
                    </Pagination> : null
                }
                <Form.Control as="select" value={perPage} custom className={classes.Select} onChange={ (e) => { setActive(1);setPerPage(e.target.value);setActivePage(true); } }>
                    <option>2</option>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </Form.Control>
            </Card.Footer>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        product_categories: state.adminProductCategories.product_categories,
        total: state.adminProductCategories.total,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductCategories: (page,limit) => dispatch(fetchProductCategories(page,limit)),
        searchCategories: (text) => dispatch(searchCategories(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategorie);
