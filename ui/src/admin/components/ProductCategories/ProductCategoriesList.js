import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import FormLabel from 'react-bootstrap/FormLabel'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './ProductList.module.css'
// import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { RemoveProductCategories,SingleProductCategories,fetchParentCategories } from '../../store/actions/Product_CategoriesActions'
import { editProductOffer } from '../../store/actions/ProductActions';
class ProductCategoriesList extends Component{
    state = {
        searchValue:"",
        id:"",
        show:false,
        show1:false,
        show2:false,
        id1:"",
        id2:"",
        offer:"",
        parent:"",
        errors:{
            offer:""
        }
    }
    removeHandler = () =>{
        if(this.state.id)
        {
            this.props.RemoveProductCategories(this.state.id);
        }
        this.handleHide();
    }
    updateHandler = async (id) =>{
      await this.props.SingleProductCategories(id);
    }

    handleHide = () => {
		this.setState({ show: false });
    };
    handleHide1 = () => {
		this.setState({ show1: false });
    };
    handleHide2 = () => {
		this.setState({ show2: false });
	};
    handleShow = (id) => { 
        this.setState({id:id,show: true })
    };
    handleShow1 = (id) => { 
        this.setState({id1:id,show1: true })
    };
    handleShowCategories = async (id,name) => {
        await this.props.fetchParentCategories(id);
        this.setState({id2:id,parent:name,show2: true })
    }
    handleParent = (categories) => {
        let arr = [];
        let len = categories.length;
        let data = "";
        for (let index = 0; index < len; index++) {
            if(len > 1)
            {
                if(index===0)
                {
                    data+=<ListGroup.Item>{"Sub Categories of : "+categories[index].name}</ListGroup.Item>
                }
                else
                {
                    data+=<ListGroup.Item>{categories[index].name}</ListGroup.Item>     
                }
            }
            else
            {
                data+=<ListGroup.Item>{"There Is No Sub Categories of : "+categories[index].name}</ListGroup.Item>     
            }
            arr.push(data);
        }
        // return arr;
        if(len===0)
        {
            return <ListGroup.Item>No Sub Categories</ListGroup.Item>
        }
        else
        {
            return categories.map((categories,index)=><div key={index+1}>
                {(categories.id !== categories.parent) ?<ListGroup.Item>{categories.name}</ListGroup.Item> :
                 (len === 1 && categories.id === categories.parent) ? <ListGroup.Item>No Sub Categories</ListGroup.Item> : ""} </div>         
            ) 
        }
    }

    renderProductCategories = (product_categories, active) => {
        if(product_categories){
        return product_categories.map((product_categories, index) => 
            <tr key={"index"+index+1}>
                <td>{index+1+active}</td>
                <td><FormLabel onClick={() => this.handleShowCategories(product_categories.id,product_categories.name)}>{product_categories.name}</FormLabel></td>
                <td><img src={"http://localhost:8080"+((product_categories.image).replace('/public',''))} alt="description" width="50px"/></td>
                <td><Button variant="info" onClick={() => this.updateHandler(product_categories.id)} as={Link} to={`/admin/ProductCategoriesEdit/${product_categories.id}`}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => this.handleShow(product_categories.id)}>Delete</Button></td>
                {/* <td><Button variant="info" onClick={() => this.handleShow1(product_categories.id)}>Add</Button></td>
                <td><Button variant="danger" onClick={() => this.handleRemoveOffer(product_categories.id)}>Remove</Button></td>  */}
            </tr>
        )
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let errors = this.state.errors;
        this.setState({errors, [name]: value}, ()=> {
            console.log(name+" <=> "+value)
        })
      }
    submitHandler =async() => {
        let errors = this.state.errors;
        let a=0;
        // if (this.state.offer.length === 0) {
        //     a=1;
        //     errors.offer = 'Offer Required';
        // }
        // else
        // {
        //     a=0;
        //     errors.offer= '';
        // }
        // if(a===0)
        // {
            await this.props.editProductOffer(this.state.id1,this.state.offer,true);
            this.setState({ show1: false });
        // }    
    }
    handleRemoveOffer =async(id) => {
        await this.props.editProductOffer(id,0,false);
    }
   
    render(){
        const {errors} = this.state;
        // let items = [];
        return <> 
        {/* <input type="text" placeholder="Enter Search Here..." className={"form-control"} onKeyUp={(event) => this.setState({searchValue: event.target.value})}/>  */}
        <Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
                {/* <th>Offer</th>
                <th>Remove Offer</th> */}
            </tr>
        </thead>
        <tbody>
            { (this.props.product_categories)?this.renderProductCategories(this.props.product_categories, this.props.active):""}
        </tbody>
        
    </Table>
    <Modal show={this.state.show} centered>
        <Modal.Body>
        <table>
            <thead>
            <tr>    
                <td>
                    <h1>Are you sure?</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <p>You want to delete?</p>
                </td>
            </tr>
            <tr> 
                <td>
                <Button variant="primary" onClick={this.removeHandler}>
                    Yes, Delete it! 
                </Button>
                </td>
                <td>
                <Button variant="secondary" onClick={this.handleHide}>
                    No, Delete
                </Button>
                </td>
            </tr>
            </thead>
        </table>
        </Modal.Body>
      </Modal>
      <Modal show={this.state.show2} onHide={this.handleHide2}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title" centered>
        <Modal.Body style={{padding:'0px'}} closeButton>
            <ListGroup>
                {(this.state.parent)?<ListGroup.Item><b>{"Sub Categories of : "+this.state.parent}</b></ListGroup.Item>:""}
                {this.handleParent(this.props.categories)}
            </ListGroup>
        </Modal.Body>
      </Modal>
      <Modal show={this.state.show1} centered>
        <Modal.Body>
        <table>
            <thead>
            <tr>    
                <td>
                    <h1>Offer</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <Form.Control isInvalid={errors.offer} type="number" name="offer" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">
                            {errors.offer}
                    </Form.Control.Feedback>
                </td>
            </tr>
            <tr> 
                <td>
                <Button variant="primary" onClick={this.submitHandler}>
                    Add 
                </Button>
                </td>
                <td>
                <Button variant="secondary" onClick={this.handleHide1}>
                    Close
                </Button>
                </td>
            </tr>
            </thead>
        </table>
        </Modal.Body>
      </Modal></>
    }
}
const mapStateToProps = (state) => ({
    loading: state.adminProductCategories.loading,
    categories:state.adminProductCategories.categories

});
const mapDispatchToProps = dispatch => {
    return {
        RemoveProductCategories: (id) => dispatch(RemoveProductCategories(id)),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id)),
        fetchParentCategories:(id) => dispatch(fetchParentCategories(id)),
        editProductOffer:(id,discount,offer) => dispatch(editProductOffer(id,discount,offer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesList);