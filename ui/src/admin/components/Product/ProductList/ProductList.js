import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

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
    const [deleteProduct, setDeleteProduct] = useState({ show: false, id: null });

    const deleteModal = (id) => {
        setDeleteProduct({ show: true, id: id });
    }
    const confirm = (doDelete) => {
        if(doDelete) props.deleteProduct(deleteProduct.id);
        setDeleteProduct({ show: false, id: null });
    }

    return <>
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
                        { renderProducts(props.products, deleteModal, props.active) }
                    </tbody>
                </Table>
            </>
}

export default ProductList