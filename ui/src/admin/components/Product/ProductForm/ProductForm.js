import React, { useState, useEffect, useMemo } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import * as classes from './ProductForm.module.css'
import SunEditor, { buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const ProductForm = (props) => {
    const [description, setDescription] = useState("");
    const [product, setProduct] = useState({
        name: "",
        price: "",
        stock: "",
        main_image: "",
        ext_images: [],
        image: null,
        images: null,
        categoryId: "1",
        videoLink: "",
        isInOffer: false,
        discount: "0"
    });
    const [formErrors, setFormErrors] = useState({
        isFormValid: false,
        nameError: "",
        priceError: "",
        stockError: "",
        main_imageError: "",
        ext_imagesError: "",
    })
    
    useEffect(() => {
        if(props.edit && props.product.name) {
            let editProduct = props.product
            let tempProduct = { ...product };
            tempProduct.name = editProduct.name;
            tempProduct.price = editProduct.price;
            tempProduct.stock = editProduct.stock;
            tempProduct.isInOffer = editProduct.isInOffer;
            tempProduct.discount = editProduct.discount;
            tempProduct.videoLink = editProduct.videoLink;
            tempProduct.categoryId = editProduct.categoryId;
            setProduct(tempProduct);
            setDescription(editProduct.description ? editProduct.description : "")
        } else {
            let tempProduct = { ...product };
            tempProduct.categoryId = props.categories[0] ? props.categories[0].id : "1";
            setProduct(tempProduct);
        }
    }, [props.product, setProduct, props.edit, props.categories])

    const productFieldChanged = (e, name, image) => {
        let oldProduct = { ...product }
        oldProduct[name] = e.target.value;
        if(name === "isInOffer") {
            oldProduct["isInOffer"] = !product.isInOffer
        }
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
        if(!product.main_image && !props.edit) {
            errors.main_imageError = "Product Main image is required";
            errors.isFormValid = false;
        } else errors.main_imageError = "";
        setFormErrors(errors);
        if(errors.isFormValid) {
            await submit();
        }
    }
    const submit = async () => {
        let productData = { ...product };
        delete productData.main_image
        delete productData.ext_images;
        if(!productData.image) delete productData.image;
        if(!productData.images) delete productData.images;
        productData.description = description
        // console.log(productData);
        let formData = new FormData();
        for(var key in productData) {
            if(key === "images") {
                if(productData["images"].length) {
                    [...productData["images"]].forEach( file => formData.append(key, file) )
                } else {
                    formData.append(key, productData["images"])
                }
                // if(Array.isArray(productData["images"])) {
                //     [...productData["images"]].forEach( file => {
                //         formData.append("images[]", file) 
                //         console.log(file);
                //     })
                // } else {
                //     console.log("222", productData["images"]);
                //     formData.append(key, productData["images"]);
                // }
            } else formData.append(key, productData[key]);
        }
        console.log(formData);
        if(props.edit) {
            await props.editProduct(formData);
        } else {
            await props.addProduct(formData);
        }
    }
    return (
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
                        <Form.Label column sm="2">Video</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                value={product.videoLink} 
                                onChange={ (e) => productFieldChanged(e, "videoLink")} 
                                type="text" 
                                placeholder="Youtube Video Link" />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Category</Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" onChange={ (e) => productFieldChanged(e, "categoryId")} value={product.categoryId}>
                                {
                                    props.categories.map( category => <option key={category.id} value={category.id}>{category.name}</option>)
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"></Form.Label>
                            <Col sm="10">
                                <Form.Check
                                    type="checkbox"
                                    id="customControlInline"
                                    label="In Offer?"
                                    checked={product.isInOffer}
                                    custom
                                    value={product.isInOffer}
                                    onChange={ (e) => productFieldChanged(e, "isInOffer")}
                                />
                            </Col>
                        </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Discount</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                disabled={!product.isInOffer}
                                className="col-10"
                                value={product.discount} 
                                onChange={ (e) => productFieldChanged(e, "discount")} 
                                type="number" placeholder="Product Discount" 
                            />
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
                                    <input type="file" onChange={ (e) => productFieldChanged(e, "main_image", "image")} className="form-control is-invalid" accept="image/*" />
                                    <div className="invalid-feedback">{ formErrors.main_imageError }</div>
                                </> :
                                <input type="file" onChange={ (e) => productFieldChanged(e, "main_image", "image")} className="form-control" accept="image/*" />
                            }
                            {
                                props.edit ?
                                <Image src={`http://localhost:8080/${props.product.main_image}`} className={classes.mainImage} /> : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Extra Imgs</Form.Label>
                        <Col sm="10">
                            <input type="file" onChange={ (e) => productFieldChanged(e, "ext_images", "images")} className="form-control" multiple accept="image/*" />
                            {
                                props.edit && props.product.images && props.product.images.length > 0 ?
                                    <Row>
                                        {
                                            props.product.images.map( image => (
                                                <Col key={image.id} sm="4">
                                                    <div className={classes.iContainer} onClick={()=> props.deleteProductImage(image.id)}>
                                                        <Image src={`http://localhost:8080/${image.image}`} />
                                                        <div className={classes.after}>x</div>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm="1">Description</Form.Label>
                <Col sm="11">
                <SunEditor 
                    setContents={description} 
                    onChange={setDescription} 
                    placeholder="Write product description here." 
                    lang="en" 
                    setOptions={{
                        buttonList: [
                            ["undo","redo"], 
                            ["font","fontSize", "formatBlock", "paragraphStyle", "blockquote", "bold", "underline", "italic", "strike", "subscript", "superscript",
                        "fontColor", "textStyle"], 
                            ["removeFormat"], 
                            ["table","list","lineHeight"]
                        ]
                    }}
                />
                    {/* <Form.Control 
                        isInvalid={ !formErrors.isFormValid && formErrors.descriptionError !== "" } 
                        onChange={ (e) => productFieldChanged(e, "description")} as="textarea" rows={3} value={product.description} />
                    <Form.Control.Feedback type="invalid">
                        { formErrors.descriptionError }
                    </Form.Control.Feedback> */}
                </Col>
            </Form.Group>

            { props.error ? <p className="text-danger">{props.error}</p> : null }
            {
                props.loading ?
                <Spinner animation="border" /> :
                <Button onClick={validate} disabled={props.loading} variant="primary" type="submit">Submit</Button>
            }
        </Form>
    )
}

export default ProductForm