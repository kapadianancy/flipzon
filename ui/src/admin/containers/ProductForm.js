import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

import * as classes from './ProductForm.module.css';
import { connect } from 'react-redux'
import { addProduct } from '../store/actions/ProductActions'

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
        categoryId: "1"
    });
    const [formErrors, setFormErrors] = useState({
        isFormValid: false,
        nameError: "",
        priceError: "",
        stockError: "",
        main_imageError: "",
        ext_imagesError: "",
        descriptionError: ""  
    })
    const productFieldChanged = (e, name, image) => {
        let oldProduct = { ...product }
        oldProduct[name] = e.target.value;
        if(image) {
            const { target: { files } } = e
            oldProduct[image] = files.length === 1 ? files[0] : files
        }
        setProduct(oldProduct);
    }
    const validate = async (e) => {
        e.preventDefault();
        let errors = { ...formErrors, isFormValid: true };
        if(!product.name || product.name === "") {
            errors.nameError = "Name is required";
            errors.isFormValid = false;
        } else errors.nameError = "";
        if(!product.price || +product.price <= 0) {
            errors.priceError = "Price must be more than zero";
            errors.isFormValid = false;
        } else errors.priceError = "";
        if(!product.stock) {
            errors.stockError = "Stock quantity is required";
            errors.isFormValid = false;
        } else errors.stockError = "";
        if(!product.main_image) {
            errors.main_imageError = "Product Main image is required";
            errors.isFormValid = false;
        } else errors.main_imageError = "";
        if(!product.description) {
            errors.descriptionError = "Product description is required";
            errors.isFormValid = false;
        } else errors.descriptionError = "";
        setFormErrors(errors);
        if(errors.isFormValid) {
            await submit();
        }
    }
    const submit = async () => {
        let productData = { ...product };
        delete productData.main_image
        delete productData.ext_images;
        console.log(productData);
        let formData = new FormData();
        for(var key in productData) {
            if(key === "images") {
                if(Array.isArray(productData["images"])) {
                    [...productData["images"]].forEach( file => formData.append(key, file) )
                } else {
                    formData.append(key, productData["images"]);
                }
                // [...productData["images"]].forEach( file => formData.append(key, file) )
            } else formData.append(key, productData[key]);
        }
        await props.addProduct(formData);
        // props.history.push("/admin/products");
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
                                <Form.Control value={product.name} 
                                    isInvalid={ !formErrors.isFormValid && formErrors.nameError !== "" } 
                                onChange={ (e) => productFieldChanged(e, "name")}  type="text" placeholder="Product Name" />
                                <Form.Control.Feedback type="invalid">
                                    { formErrors.nameError }
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Price</Form.Label>
                                    <Col sm="10">
                                        <Form.Control 
                                            isInvalid={ !formErrors.isFormValid && formErrors.priceError !== "" } 
                                            value={product.price} onChange={ (e) => productFieldChanged(e, "price")} type="number" placeholder="Product Price" />
                                        <Form.Control.Feedback type="invalid">
                                            { formErrors.priceError }
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Stock</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            isInvalid={ !formErrors.isFormValid && formErrors.stockError !== "" }  
                                            value={product.stock} onChange={ (e) => productFieldChanged(e, "stock")} type="number" placeholder="Product Stock" />
                                        <Form.Control.Feedback type="invalid">
                                            { formErrors.stockError }
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Main Img</Form.Label>
                                    <Col sm="10">
                                            { 
                                                !formErrors.isFormValid && formErrors.main_imageError !== "" ? 
                                                <>
                                                    <input type="file" onChange={ (e) => productFieldChanged(e, "main_image", "image")} className="form-control is-invalid" />
                                                    <div className="invalid-feedback">{ formErrors.main_imageError }</div>
                                                </> :
                                                <input type="file" onChange={ (e) => productFieldChanged(e, "main_image", "image")} className="form-control" />
                                            }
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
                                <Form.Control as="select" onChange={ (e) => productFieldChanged(e, "categoryId")} value={product.categoryId}>
                                    <option value="1">Electronics</option>
                                    <option value="1">Home Appliences</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm="1">Description</Form.Label>
                            <Col sm="11">
                                <Form.Control 
                                    isInvalid={ !formErrors.isFormValid && formErrors.descriptionError !== "" } 
                                    onChange={ (e) => productFieldChanged(e, "description")} as="textarea" rows={3} value={product.description} />
                                <Form.Control.Feedback type="invalid">
                                    { formErrors.descriptionError }
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        { props.error ? <p class="text-danger">{props.error}</p> : null }
                        <Button onClick={validate} disabled={props.loading} variant="primary" type="submit">
                            { props.loading ? 'Adding...' : 'Submit' }
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.adminProduct.loading,
        error: state.adminProduct.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (productData) => dispatch(addProduct(productData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)