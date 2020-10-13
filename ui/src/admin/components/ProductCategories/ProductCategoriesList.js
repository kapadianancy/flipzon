import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './ProductList.module.css'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { RemoveProductCategories,SingleProductCategories } from '../../store/actions/Product_CategoriesActions'
class ProductCategoriesList extends Component{
    state = {
        searchValue:"",
        id:"",
        show:false
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
    handleShow = (id) => { 
        this.setState({id:id,show: true })
    };
    
    renderProductCategories = (product_categories, activeOld, perPage) => {
        let product_categoriesArr = [];
        let active = (activeOld-1)*perPage;
        for(let i=active;i<(activeOld*perPage);i++) {
            if(product_categories[i]) {
                product_categoriesArr.push(
                    <tr key={product_categories[i].id}>
                        <td>{i+1}</td>
                        <td>
                            {product_categories[i].name}
                        </td>
                        <td><img src={"http://localhost:8080"+((product_categories[i].image).replace('/public',''))} alt="description" width="50px"/></td>
                        <td><Button variant="info" onClick={() => this.updateHandler(product_categories[i].id)} as={Link} to={`/admin/ProductCategoriesEdit/${product_categories[i].id}`}>Edit</Button></td>
                        <td><Button variant="danger" onClick={() => this.handleShow(product_categories[i].id)}>Delete</Button></td>
                    </tr>
                )
            }
        }
        return product_categoriesArr;
    }
        
    render(){
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
            </tr>
        </thead>
        <tbody>
            { this.props.loading ? <Spinner animation="border" /> : this.renderProductCategories(this.props.product_categories, this.props.active, this.props.perPage) }
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
      </Modal></>
    }
}
const mapStateToProps = (state) => ({
    loading: state.adminProductCategories.loading
});
const mapDispatchToProps = dispatch => {
    return {
        RemoveProductCategories: (id) => dispatch(RemoveProductCategories(id)),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesList);