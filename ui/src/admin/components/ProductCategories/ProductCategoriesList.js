import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { RemoveProductCategories,SingleProductCategories } from '../../store/actions/Product_CategoriesActions'
class ProductCategoriesList extends Component{
    
    removeHandler = (id) =>{
        this.props.RemoveProductCategories(id);
    }
    updateHandler = async (id) =>{
      await this.props.SingleProductCategories(id);
    }
        submit = (id) => { confirmAlert({
            customUI: ({ onClose }) => {
            return (
                <table>
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
                        <Button onClick={() => { this.props.RemoveProductCategories(id)
                            onClose(); }}> Yes, Delete it! </Button>
                        </td>
                        <td>
                            <Button onClick={onClose}>No, Delete</Button>
                        </td>
                    </tr>
                </table>
            );
            }
        });
        }
        renderProductCategories = (categories) => {
        //   debugger;
        // let cnt = 0;
    
        return  categories.map((product_categories, index) => 
            <tr key={"index"+index+1}>
                <td>{index+1}</td>
                <td>{product_categories.name}</td>
                {/* <td>{product_categories.description}</td> */}
                    { }
                <td><img src={"http://localhost:8080"+(product_categories.image).replace('/images','')} alt="description" width="50px"/></td>
                {/* <td><Button variant="info" onClick={() => this.updateHandler(product_categories.id)}>Edit</Button></td> */}
                <td><Button variant="info" onClick={() => this.updateHandler(product_categories.id)} as={Link} to={`/admin/ProductCategoriesEdit/${product_categories.id}`}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => this.submit(product_categories.id)}>Delete</Button></td>
            </tr>
            )
    }
   
    render(){
        // let items = [];
        return <Table responsive striped bordered hover size="sm">
        <thead>
        <tr>
                <th>#</th>
                <th>Category Name</th>
                {/* <th>Description</th> */}
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            { this.props.loading ? <tr><td>loading......</td></tr> : this.renderProductCategories(this.props.product_categories) }
        </tbody>
        
    </Table>
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