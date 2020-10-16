import React, { useState, useEffect, useMemo } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import * as classes from './ProductForm.module.css'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const renderSpecifications = (titles, details, handleChange, deleteSpecification) => {
    return titles.map( title => (
                    <div key={title.key} className={classes.specificationContainer} >
                        <div className={classes.specRemoveBtn}>
                            <Button variant="danger" onClick={() => deleteSpecification(title.key)}>X</Button>
                        </div>
                        <div className={classes.specTitle}>
                            <Form.Control 
                                type="text" placeholder="Write product specification title here" 
                                value={title.title}
                                onChange={ (e) => handleChange(title.key, e.target.value, "title")}
                            ></Form.Control>
                        </div>
                        <div className={classes.specDetails}>
                            <SunEditor 
                                setContents={details[title.key].details} 
                                onChange={ (val) => handleChange(title.key, val, "details")}
                                placeholder="Write product specification details here" 
                                setOptions={{
                                    buttonList: [
                                        ["fontSize", "formatBlock", "bold", "underline", "italic" ], 
                                        ["removeFormat"], 
                                        ["table","list"]
                                    ]
                                }}
                            />
                        </div>
                    </div>
    ))
}

const ProductForm = (props) => {
    const [ids, setIds] = useState(new Set([]));
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
    const [titles, setTitles] = useState([]);
    const [details, setDetails] = useState([]);

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
            let titles = [], details = [];
            if(editProduct.specifications.length > 0) {
                editProduct.specifications.forEach( (spec, key) => {
                    titles.push({ key, title: spec.title });
                    details.push({ key, details: spec.details });
                });
            }
            setTitles(titles);
            setDetails(details);
            setProduct(tempProduct);
            setDescription(editProduct.description ? editProduct.description : "")
        } else {
            let tempProduct = { ...product };
            tempProduct.categoryId = props.categories[0] ? props.categories[0].id : "1";
            setProduct(tempProduct);
        }
    }, [props.product, setProduct, props.edit, props.categories])

    // validation and submitting
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

        let specifications = titles.map( (title, i) => ({ "title": title.title, "details": details[i].details }));

        // // console.log(productData);
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
        if(specifications.length > 0) {
            formData.append("specifications", JSON.stringify(specifications));
        }
        // console.log(formData);
        if(props.edit) {
            await props.editProduct(formData);
        } else {
            await props.addProduct(formData);
        }
        
    }

    // images
    const imageCheckboxChange = (imgId) => {
        if(ids.has(imgId)) {
            let newIds = new Set([...ids])
            newIds.delete(imgId);
            setIds(newIds);
        } else {
            let newIds = new Set([...ids])
            newIds.add(imgId);
            setIds(newIds);
        }
    }
    const deleteImages = async () => {
        await props.deleteProductImages(ids);
        ids.clear();
    }

    // manage specifications
    const addSpecification = () => {
        let newTitles = [...titles];
        newTitles.push({ key: titles.length, title: "" });
        let newDetails = [...details];
        newDetails.push({ key: titles.length, details: "" });
        setTitles(newTitles);
        setDetails(newDetails);
    }
    const deleteSpecification = (key) => {
        let newTitles = [...titles].filter( title => title.key !== key);
        let newDetails = [...details].filter( detail => detail.key !== key);
        setTitles(newTitles);
        setDetails(newDetails);
    }
    const handleSpecDataChange = (key, value, field) => {
        if(field === "title") {
            let newTitles = [...titles];
            newTitles[key].title = value;
            setTitles(newTitles); 
        } else {
            let newDetails = [...details];
            newDetails[key].details = value;
            setDetails(newDetails); 
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
                                                    <div className={classes.iContainer} onClick={() => imageCheckboxChange(image.id)} >
                                                        <Image src={`http://localhost:8080/${image.image}`} />
                                                        { 
                                                            ids.has(image.id) && <div className={classes.after}>&#10004;</div>
                                                        }
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                : null
                            }
                            <Button onClick={deleteImages} disabled={ ids.size === 0 || props.loading } className="my-2 float-right" variant="danger" type="button">Delete All</Button>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Form.Label column sm="1">Specs</Form.Label>
                <Col sm="11">
                    { renderSpecifications(titles, details, handleSpecDataChange, deleteSpecification) }
                    <Button variant="primary" onClick={() => addSpecification()}>+</Button>
                </Col>
            </Row>

            <Form.Group as={Row} className="mt-2">
                <Form.Label column sm="1">Description</Form.Label>
                <Col sm="11">
                <SunEditor 
                    setContents={description} 
                    onChange={setDescription} 
                    placeholder="Write product description here." 
                    lang="en" 
                    height="250"
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