import React, { useState, useRef } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import * as classes from './ProductList.module.css'

const renderProducts = (products, deleteProduct, active) => {
    return products.map( (product, i) => (
        <tr key={product.id}>
            <td>{i+1+active}</td>
            <td>{product.name}</td>
            <td>{product.Product_category.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td><Button as={Link} to={`/admin/products/edit/${product.id}`} variant="info">Edit</Button></td>
            <td><Button onClick={() => deleteProduct(product.id)} variant="danger">Delete</Button></td>
        </tr>
    ))
}
const renderPrintProducts = (products, active) => {
    return products.map( (product, i) => (
        <tr key={product.id}>
            <td>{i+1+active}</td>
            <td>{product.name}</td>
            <td>{product.Product_category.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.isInOffer}</td>
            <td>{product.discount}</td>
        </tr>
    ))
}

const ProductList = (props) => {
    const [deleteProduct, setDeleteProduct] = useState({ show: false, id: null });
    const [sort, setSort] = useState({ key: "id", asc: true, title:"id", type: "num" })
    let headers = [
        { title: "#", sortable: false, key: "id", type:"num" },
        { title: "Name", sortable: true, key: "name", type:"str" },
        { title: "Category", sortable: true, key: "category", type:"str" },
        { title: "Price", sortable: true, key: "price", type:"num" },
        { title: "Stock", sortable: true, key: "stock", type:"num" },
        { title: "Edit", sortable: false, key: "", type:"num" },
        { title: "Delete", sortable: false, key: "", type:"num" },
    ]
    
    let products;
    if(sort.type === "num") {
        if(sort.asc) {
            products = props.products.sort( (p1, p2) => (p1[sort.key] - p2[sort.key]));
        } else {
            products = props.products.sort( (p1, p2) => (p2[sort.key] - p1[sort.key]));
        }
    } else {
        if(sort.asc) {
            products = props.products.sort( (p1, p2) => {
                return ('' + p1[sort.key]).localeCompare(p2[sort.key])
            });
        } else {
            products = props.products.sort( (p1, p2) => {
                return ('' + p2[sort.key]).localeCompare(p1[sort.key])
            });
        }
    }

    const changeSort = (header) => {
        if(header.key === sort.key) {
            setSort({ key: sort.key, asc: !sort.asc, title: header.title, type: header.type });
        } else {
            setSort({ key: header.key, asc: true, title: header.title, type: header.type });
        }
    }
    const deleteModal = (id) => {
        setDeleteProduct({ show: true, id: id });
    }
    const confirm = (doDelete) => {
        if(doDelete) props.deleteProduct(deleteProduct.id);
        setDeleteProduct({ show: false, id: null });
    }
    
    return <>
                <div style={{ display: "none" }}>
                    <Table striped responsive hover ref={props.printBlockRef} size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>InOffer</th>
                                <th>Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderPrintProducts(props.products, props.active) }
                        </tbody>
                    </Table>
                </div>
                <Modal show={deleteProduct.show} onHide={() => confirm(false) } centered size="sm">
                <Card bg="Light" text='dark' >
                    <Card.Body>
                        <Card.Title><b>Are you sure!</b></Card.Title>
                        <Card.Text>
                            Do you want to delete this product?
                        </Card.Text>
                        <Button variant="danger" className="mr-1" onClick={() => confirm(true) }>Delete</Button>
                        <Button variant="secondary" onClick={() => confirm(false) }>Cancel</Button>
                    </Card.Body>
                </Card>
            </Modal>
                <Table striped responsive hover size="sm">
                    <thead>
                        <tr>
                            {
                                headers.map( header => (
                                    header.sortable 
                                    ? <th key={header.title} className={classes.sortable} onClick={() => changeSort(header)}>
                                        { header.title }
                                        { sort.key === header.key 
                                            ? sort.asc ? <span>&#8595;</span> : <span>&#8593;</span>
                                            : null 
                                        }
                                    </th>
                                    : <th key={header.title}>{header.title}</th> 
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { renderProducts(products, deleteModal, props.active, sort) }
                    </tbody>
                </Table>
            </>
}

export default ProductList