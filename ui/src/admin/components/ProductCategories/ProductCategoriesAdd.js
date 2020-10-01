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
        image:"",
        valid:true,
        valid1:true,
        errors: {
            name: '',
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
            errors.name = value.length < 1 ? 'Name is Required' : '';
            break;
          default:
            break;
        }
        if(errors.name.length > 1)
        {
            this.setState({valid:true});
        }
        else
        {
            this.setState({valid:false});
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
        const imageFile = e.target.files[0];
        let errors = this.state.errors;

        if (!imageFile) {
            errors.image = 'image Required';
            this.setState({valid1:true});
        }
        else
        {
            errors.image = '';
            this.setState({valid1:false});
        }
    
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
    postDataHandler = async (e) =>{
        e.preventDefault();
        const data = new FormData()
        data.append('name', this.state.name)
        data.append('image', this.state.image)
        
        await this.props.AddProductCategories(data);
        await this.props.fetchProductCategories();
        // this.setState({
        //     name: '',
        // })
        await this.props.history.push('/admin/productcategories'); 
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
                        Product Categories Add
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={() => this.handleSubmit}>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control isInvalid={errors.name} type="text" name="name" onChange={this.handleChange} placeholder="Enter Category"/>
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Image</Form.Label>
                        <Form.Control isInvalid={errors.image} type="file" name="image" onChange={this.onFileChange}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button disabled={proderr === "true" ? true : false} onClick={this.postDataHandler} type="button" variant="primary">
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