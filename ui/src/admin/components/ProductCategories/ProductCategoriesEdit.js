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
        myimg:'',
        valid:false,
        valid1:false,
        errors: {
            name: '',
            image:''
        }
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

        this.setState({myimg:(category[0].image).replace('/public','')})
    }
    onFileChange = (e) =>{
        const imageFile = e.target.files[0];
        let errors = this.state.errors;

        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            errors.image = 'image Should be jpg,jpeg or png';
            this.setState({valid1:true});
        }
        else
        {
            errors.image = '';
            this.setState({valid1:false});
        }
        this.setState(
        { image: e.target.files[0] }
        )
    }
    
    onTodoChange(value){
        let errors = this.state.errors;
        if(value.length > 1)
        {
            errors.name ="";
            this.setState({valid:false});
        }
        else
        {
            errors.name = "Name is Required";
            this.setState({valid:true});
        }
        this.setState({
            name: value
        });
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
        await this.props.history.replace('/admin/productcategories');
    }
    render(){
        const {errors} = this.state;
        let proderr = "";
        if(this.state.valid === true && this.state.valid1 === true)
        {   
            proderr = "true";
        }  
        else if(this.state.valid === false && this.state.valid1 === false)
        {
            proderr = "false";
        }
        else
        {
            proderr = "true";
        }
        return(
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product Categories Edit
                    </div>
                </Card.Header>
                <Card.Body>
                <Form>
                    
                    <Form.Control type="hidden" value={this.state.id || ''} onChange={(event) => this.setState({id: event.target.value})} placeholder="Enter Id" />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control isInvalid={errors.name}  type="text" value={this.state.name || ''} onChange={e => this.onTodoChange(e.target.value)} placeholder="Enter Category" />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control isInvalid={errors.image}  type="file" name="image" onChange={this.onFileChange}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                        {this.state.image === "" ? "":<img src={"http://localhost:8080"+this.state.myimg} alt="description" width="50px"/>}    
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea4">
                    <Button disabled={proderr === "true" ? true : false} onClick={this.postDataHandler} type="button" variant="primary">
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