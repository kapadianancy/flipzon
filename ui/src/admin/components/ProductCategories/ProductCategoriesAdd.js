import React, { Component } from 'react';
import { Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as classes from '../../containers/Products.module.css'
import { AddProductCategories,fetchProductCategories } from '../../store/actions/Product_CategoriesActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class ProductCategoriesAdd extends Component{
    state = {
        name:"",
        image:"",
        category:"",
        errors: {
            name: '',
            image:'',
            category:''
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let errors = this.state.errors;
        this.setState({errors, [name]: value}, ()=> {
            // console.log(name+" <=> "+value)
        })
      }
    
    onFileChange = (e) =>{
        const imageFile = e.target.files[0];
        let errors = this.state.errors;
        if(imageFile)
        {
            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                errors.image = 'image Should be jpg,jpeg or png';
                this.setState({valid1:true});
            }
            else
            {
                errors.image = '';
                this.setState({valid1:false});
            }
        }
        this.setState(
        { image: e.target.files[0] }
        )
    }
    postDataHandler = async () =>{
        // e.preventDefault();

        if(this.state.category==="MainCategory")
        {
            const data = new FormData()
            data.append('name', this.state.name)
            data.append('image', this.state.image)
            await this.props.AddProductCategories("0",data);
        }
        else
        {
            const data = new FormData()
            data.append('name', this.state.name)
            data.append('image', this.state.image)
            data.append('parent', this.state.category)
            await this.props.AddProductCategories(this.state.category,data);
        }
       
        await this.props.fetchProductCategories();
        await this.props.history.push('/admin/productcategories'); 
    }
   
    submitDataHandler = () => {

        let errors = this.state.errors;
        let a=0,a1=0,a2=0;
        if (!this.state.name) {
            a=1;
            errors.name = 'Category Name Required';
        }
        else
        {
            a=0;
            errors.name = '';
        }
        if (!this.state.image) {
            a1=1;
            errors.image = 'Image Required';
        }
        else
        {
            a1=0;
            errors.image = '';
        }
        if (this.state.category.length === 0 || !this.state.category || this.state.category==="Select") {
            a2=0;
            errors.category = 'Parent Category Required';
        }
        else
        {
            a2=0;
            errors.category = '';
        }

        if(a===0 && a1===0 && a2===0)
        {
            this.postDataHandler();
        }
        this.setState({errors:errors});
    }
    render(){
        
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
             <font> Required Name</font>
            </Tooltip>
          );
        const renderTooltip2 = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                <font> Required Image</font>
            </Tooltip>
        );  
        const renderTooltip3 = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                <font> Required Parent Category</font>
            </Tooltip>
        );
        const {errors} = this.state;
        
        return(
            <Card>
                <Card.Header className={classes.Header}>
                    <div className={classes.Title}>
                        Product Categories Add
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={() => this.handleSubmit}>
                    {/* <span>(<font style={{color:"red"}}> * </font></span>Mandatory field)  */}
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Category Name</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            <span><font style={{color:"red"}}> *</font></span>
                        </OverlayTrigger>
                        <Form.Control isInvalid={errors.name} type="text" name="name" onChange={this.handleChange} placeholder="Enter Category"/>
                        
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Parent Category:</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip3}>
                            <span><font style={{color:"red"}}> *</font></span>
                        </OverlayTrigger>
                        <Form.Control as="select" isInvalid={errors.category} name="category"  className="form-control" onChange={this.handleChange}>
                            <option value="Select">---select---</option>
                            <option value="MainCategory">Main Category</option>
                            {
                                this.props.product_categories.map( category => <option key={category.id} value={category.id}>{category.name}</option>)
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Image</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip2}>
                            <span><font style={{color:"red"}}> *</font></span>
                        </OverlayTrigger>
                        <Form.Control isInvalid={errors.image} type="file" name="image" onChange={this.onFileChange}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button onClick={this.submitDataHandler} type="button" variant="primary">
                        Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        ) 
    }
}

const mapStateToProps = (state) => ({
    err:state.adminProductCategories.error,
    product_categories: state.adminProductCategories.product_categories
});

const mapDispatchToProps = dispatch => {
    return{
        fetchProductCategories: () => dispatch(fetchProductCategories()),
        AddProductCategories: (id,post) => dispatch(AddProductCategories(id,post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesAdd);