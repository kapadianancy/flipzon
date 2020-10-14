import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

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

const ProductList = (props) => {
    const deleteAlert = (id) => { 
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <table>
                        <thead>
                        <tr>    
                            <td>
                                <h1>Are you sure?</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>You want to delete?</p>
                            </td>
                        </tr>
                        <tr> 
                            <td>
                            <Button onClick={() => { props.deleteProduct(id)
                                onClose(); }}> Yes, Delete it! </Button>
                            </td>
                            <td>
                                <Button onClick={onClose}>Cancel</Button>
                            </td>
                        </tr>
                        </thead>
                    </table>
                );
            }
        });
    }
    return <Table striped responsive hover size="sm">
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
            { renderProducts(props.products, deleteAlert, props.active) }
        </tbody>
    </Table>
}

export default ProductList