import React, { Component } from 'react';
// import axios from 'axios';
import { Form} from 'react-bootstrap'
// import * as classes from './ProductList.module.css';
// import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as classes from '../../containers/Products.module.css'
import { updateProductCategories,SingleProductCategories,fetchProductCategories } from '../../store/actions/Product_CategoriesActions'

class ProductCategoriesEdit extends Component{
    state = {
        id:'',
        name:'',
        // description:'',
        image:'',
        myimg:''
    }

    componentDidMount = async () =>
    {
        await this.props.SingleProductCategories(this.props.match.params.id);
        let category = await this.props.product_categorie
            
        this.setState({
            id:category[0].id,
            name:category[0].name,
            // description:category[0].description,
            image:category[0].image
        })  

        this.setState({myimg:category[0].image.replace('/images','')})
    }
    onFileChange = (e) =>{
        // this.setState({ profileImg: e.target.files[0] })
        this.setState(
            { image: e.target.files[0] }
            )
    }
    postDataHandler = async (e) =>{
        e.preventDefault();
        
        // const put = {
        //     id:this.state.id,
        //     name:this.state.name,
        //     description:this.state.description,
        //     image:this.state.image
        // }   
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('name', this.state.name)
        // data.append('description', this.state.description)
        data.append('image', this.state.image)
        
        await this.props.updateProductCategories(this.state.id,data);
        await this.props.fetchProductCategories();
        await this.props.history.replace('/admin/product_categories');
    }
    render(){
        return(
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product Categories Edit
                    </div>
                </Card.Header>
                <Card.Body>
                <Form enctype="multipart/form-data">
                    
                    <Form.Control type="hidden" value={this.state.id || ''} onChange={(event) => this.setState({id: event.target.value})} placeholder="Enter Id" />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" value={this.state.name || ''} onChange={(event) => this.setState({name: event.target.value})} placeholder="Enter Category" />
                    </Form.Group>
                    {/* <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control rows="4" type="text" value={this.state.description || ''} onChange={(event) => this.setState({description: event.target.value})} placeholder="Enter Description" />
                    </Form.Group> */}
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.onFileChange}/>
                        {this.state.image === "" ? "":<img src={"http://localhost:8080"+this.state.myimg} alt="description" width="50px"/>}
                        
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea4">
                        <Button onClick={this.postDataHandler} variant="primary">
                            Submit
                        </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        ) 
    }
}

//export default ProductCategoriesList;
const mapStateToProps = (state) => ({
    product_categorie: state.adminProductCategories.product_categorie
});

const mapDispatchToProps = dispatch => {
    return{
        fetchProductCategories: () => dispatch(fetchProductCategories()),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id)),
        updateProductCategories: (id,put) => dispatch(updateProductCategories(id,put))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesEdit);