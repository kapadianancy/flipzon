import React, { Component } from 'react';
import { Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as classes from '../../containers/Products.module.css'
import { AddProductCategories,fetchProductCategories } from '../../store/actions/Product_CategoriesActions'
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class ProductCategoriesAdd extends Component{
    state = {
        name:"",
        // description:"",
        image:"",
        formErrors: {},
        errors: {
            name: '',
            // description: '',
            image:''
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let errors = this.state.errors;
        
        switch (name) {
          case 'name': 
            errors.name = value.length < 1 ? 'name Required' : '';
            break;
        //   case 'description': 
        //     errors.description = value.length < 1 ? 'description Required' : '';
        //     break;
          default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
      }
    handleSubmit = async (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {            
        console.info('Valid Form')
        }else{
        console.error('Invalid Form')
        }
    }
    onFileChange = (e) =>{
        // this.setState({ profileImg: e.target.files[0] })
        this.setState(
            { image: e.target.files[0] }
            )
    }
    postDataHandler = async (e) =>{
        e.preventDefault();
        const data = new FormData()
        data.append('name', this.state.name)
        // data.append('description', this.state.description)
        data.append('image', this.state.image)
        
        await this.props.AddProductCategories(data);
        await this.props.fetchProductCategories();
        this.setState({
            name: '',
            // description: ''
        })
        await this.props.history.push('/admin/product_categories'); 
    }

    render(){
        const {errors} = this.state;  
        return(
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product Categories Add
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Enter Category"/>
                        {errors.name.length > 0 && 
                        <span><font color="red">{errors.name}</font></span>}
                    </Form.Group>


                    {/* <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={this.handleChange} placeholder="Enter Description"/>
                        {errors.description.length > 0 && 
                        <span><font color="red">{errors.description}</font></span>}
                    </Form.Group> */}

                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.onFileChange}/>
                    </Form.Group>
                    
                    <Button disabled={(errors.name.length > 0)} onClick={this.postDataHandler} variant="primary">
                        Submit
                    </Button>
                    
                    </Form>
                </Card.Body>
            </Card>
        ) 
    }
}

//export default ProductCategoriesList;
const mapStateToProps = (state) => ({
    err:state.adminProductCategories.error,
    product_categories: state.adminProductCategories.product_categories
});

const mapDispatchToProps = dispatch => {
    return{
        fetchProductCategories: () => dispatch(fetchProductCategories()),
        AddProductCategories: (post) => dispatch(AddProductCategories(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesAdd);