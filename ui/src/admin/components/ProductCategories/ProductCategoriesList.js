import React , {Component} from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import FormLabel from 'react-bootstrap/FormLabel'
import Modal from 'react-bootstrap/Modal'
import { Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { FaEdit , FaTrashAlt } from "react-icons/fa";

import './ProductList.module.css'
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { RemoveProductCategories,SingleProductCategories,fetchParentCategories } from '../../store/actions/Product_CategoriesActions'
import { editProductOffer } from '../../store/actions/ProductActions';

class ProductCategoriesList extends Component{
    state = {
        id:"",
        photoIndex: 0,
        isOpen: false,
        show:false,
        show1:false,
        show2:false,
        direction:'default',
        id1:"",
        id2:"",
        img:"",
        offer:"",
        parent:"",
        errors:{
            offer:""
        },
        data:[]
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
        let len = categories.length;
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
    handleImage = (img) => {
        this.setState({ isOpen: true,img:img })
    }
    renderProductCategories = (product_categories, active) => {
        return product_categories.map((product_categories, index) => 
            <tr key={"index"+index+1}>
                <td>{index+1+active}</td>
                <td><FormLabel onClick={() => this.handleShowCategories(product_categories.id,product_categories.name)}>{product_categories.name}</FormLabel></td>
                <td><img src={"http://localhost:8080"+((product_categories.thumbnailImage))} alt="no image" onClick={() => this.handleImage("http://localhost:8080"+((product_categories.image))) }/></td>
                <td><Button onClick={() => this.updateHandler(product_categories.id)} as={Link} to={`/admin/ProductCategoriesEdit/${product_categories.id}`}><FaEdit/></Button></td>
                <td><Button variant="danger" onClick={() => this.handleShow(product_categories.id)}><FaTrashAlt/></Button></td>
                {/* <td><Button variant="info" onClick={() => this.handleShow1(product_categories.id)}>Add</Button></td>
                <td><Button variant="danger" onClick={() => this.handleRemoveOffer(product_categories.id)}>Remove</Button></td>  */}
            </tr>
    )}
    handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        let errors = this.state.errors;
        this.setState({errors, [name]: value}, ()=> {
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
    onSortAcending(event, sortKey){
        const data = this.props.product_categories;
        if(this.state.direction==='acending' || this.state.direction==='default'){
            data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
            this.setState({direction:'decending'})
        }
    }
    onSortDecending(event, sortKey){
        const data = this.props.product_categories;
        if (this.state.direction==='decending' || this.state.direction==='default'){
            data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
            this.setState({direction:'acending'})
        }
    }  
    render(){
        const {errors} = this.state;
        const { photoIndex, isOpen } = this.state;
        return <> 
        {/* <input type="text" placeholder="Enter Search Here..." className={"form-control"} onKeyUp={(event) => this.setState({searchValue: event.target.value})}/>  */}
        <Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Category Name <span onClick={e => this.onSortAcending(e, 'name')}>&#8593;</span><span onClick={e => this.onSortDecending(e, 'name')}>&#8595;</span></th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
                {/* <th>Offer</th>
                <th>Remove Offer</th> */}
            </tr>
        </thead>
        <tbody>
            {(this.props.product_categories.length>0) ? this.renderProductCategories(this.props.product_categories, this.props.active):null}
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
                <Button variant="danger" onClick={this.removeHandler}>
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
      </Modal>
      {isOpen && this.state.img && (
          <Lightbox
            mainSrc={this.state.img}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}  

      </>
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