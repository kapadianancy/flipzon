import React, { Component } from 'react';
import { Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';
import * as classes from '../../containers/Products.module.css'
import { updateProductCategories,SingleProductCategories,fetchProductCategories } from '../../store/actions/Product_CategoriesActions'

class ProductCategoriesEdit extends Component{
    state = {
        id:'',
        name:'',
        category:'',
        image:'',
        thumbnailImage:'',
        myimg:'',
        sub:false,
        valid:false,
        valid1:false,
        errors: {
            name: '',
            image:''
        }
    }

    componentDidMount = async () =>
    {
        await this.props.fetchProductCategories();
        await this.props.SingleProductCategories(this.props.match.params.id);
        let prod_category = await this.props.prod_category
            
        this.setState({
            id:prod_category[0].id,
            name:prod_category[0].name,
            image:prod_category[0].image,
            category:prod_category[0].parent
        })  

        this.setState({myimg:(prod_category[0].thumbnailImage)})
    }
    handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let errors = this.state.errors;
        
        this.setState({errors, [name]: value}, ()=> {
            console.log(name + " <=> " + value)
        })
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
        this.setState({sub:true})
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('name', this.state.name)
        data.append('image', this.state.image)
        data.append('parent', this.state.category)
        await this.props.updateProductCategories(this.state.id,data);
        this.setState({sub:false})
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
                        <Form.Label>Category Name</Form.Label><span><font style={{color:"red"}}> *</font></span>
                        <Form.Control isInvalid={errors.name}  type="text" value={this.state.name || ''} onChange={e => this.onTodoChange(e.target.value)} placeholder="Enter Category" />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Parent Category:</Form.Label>
                        <select name="category"  className="form-control" value={this.state.category || ''} onChange={this.handleChange}>
                            {
                                this.props.product_categorie.map( cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                            }
                        </select>
                    </Form.Group> 
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Image</Form.Label><span><font style={{color:"red"}}> *</font></span>
                        <Form.Control isInvalid={errors.image}  type="file" name="image" onChange={this.onFileChange}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                        {this.state.image === "" ? "":<img src={this.state.myimg} alt="description" width="150px"/>}    
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea4">
                    <Button disabled={proderr === "true" ? true : false} onClick={this.postDataHandler} type="button" variant="primary">
                        Submit
                    </Button>{(this.state.sub)?<Spinner animation="border" />:""}
                        </Form.Group>
                </Form>
                </Card.Body>
            </Card>
        ) 
    }
}

//export default ProductCategoriesList;
const mapStateToProps = (state) => ({
    prod_category: state.adminProductCategories.product_categorie,
    product_categorie: state.adminProductCategories.product_categories
});

const mapDispatchToProps = dispatch => {
    return{
        fetchProductCategories: () => dispatch(fetchProductCategories()),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id)),
        updateProductCategories: (id,put) => dispatch(updateProductCategories(id,put))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesEdit);