import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


const renderProducts = (products, deleteProduct, activeOld, perPage) => {
    let productsArr = [];
    let active = (activeOld-1)*perPage;
    for(let i=active;i<(activeOld*perPage);i++) {
        if(products[i]) {
            productsArr.push(
                <tr key={products[i].id}>
                    <td>{i+1}</td>
                    <td>{products[i].name}</td>
                    <td>{products[i].Product_category.name}</td>
                    <td>{products[i].price}</td>
                    <td>{products[i].stock}</td>
                    <td><Button as={Link} to={`/admin/products/edit/${products[i].id}`} variant="info">Edit</Button></td>
                    <td><Button onClick={() => deleteProduct(products[i].id)} variant="danger">Delete</Button></td>
                </tr>
            )
        }
    }
    return productsArr;
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
            { renderProducts(props.products, props.deleteProduct, props.active, props.perPage) }
        </tbody>
    </Table>
}

export default ProductList