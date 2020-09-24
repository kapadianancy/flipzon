import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import * as classes from './ProductForm.module.css';

const ProductForm = (props) => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        stock: "",
        main_image: "",
        ext_images: [],
        image: null,
        images: null,
        description: "",
        category: ""
    });
    const productFieldChanged = (e, name, image) => {
        let oldProduct = { ...product }
        oldProduct[name] = e.target.value;
        if(image) {
            const { target: { validity, files: [file] } } = e
            oldProduct[image] = file
        }
        setProduct(oldProduct);
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(product);
    }
    return (
        <>
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Add Product
                    </div>
                    <Button as={Link} to="/admin/products" variant="primary">Show All</Button>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Name</Form.Label>
                            <Col sm="11">
                                <Form.Control value={product.name} onChange={ (e) => productFieldChanged(e, "name")}  type="text" placeholder="Product Name" />
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Price</Form.Label>
                                    <Col sm="10">
                                        <Form.Control value={product.price} onChange={ (e) => productFieldChanged(e, "price")} type="number" placeholder="Product Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Stock</Form.Label>
                                    <Col sm="10">
                                        <Form.Control value={product.stock} onChange={ (e) => productFieldChanged(e, "stock")} type="number" placeholder="Product Stock" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Main Img</Form.Label>
                                    <Col sm="10">
                                        <input type="file" onChange={ (e) => productFieldChanged(e, "main_image", "image")} className="form-control" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Extra Imgs</Form.Label>
                                    <Col sm="10">
                                        <input type="file" onChange={ (e) => productFieldChanged(e, "ext_images", "images")} className="form-control" multiple />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group as={Row}>
                            <Form.Label column sm="1">Category</Form.Label>
                            <Col sm="11">
                                <Form.Control as="select" onChange={ (e) => productFieldChanged(e, "category")} value={product.category}>
                                    <option>Electronics</option>
                                    <option>Home Appliences</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm="1">Description</Form.Label>
                            <Col sm="11">
                                <Form.Control onChange={ (e) => productFieldChanged(e, "description")} as="textarea" rows={3} value={product.description} />
                            </Col>
                        </Form.Group>

                        <Button onClick={submit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductForm