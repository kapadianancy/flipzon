import React from 'react';
import * as classes from './ProductList.module.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const renderProducts = (products) => {
    return products.map( (product, index) => 
        <tr key={product.id}>
            <td>{index+1}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td><Button variant="info">Edit</Button></td>
            <td><Button variant="danger">Delete</Button></td>
        </tr>
    )
}

const ProductList = (props) => {
    return <Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            { renderProducts(props.products) }
        </tbody>
    </Table>
}

export default ProductList