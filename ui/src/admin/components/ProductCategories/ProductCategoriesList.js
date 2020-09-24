import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { RemoveProductCategories,SingleProductCategories } from '../../store/actions/Product_CategoriesActions'

class ProductCategoriesList extends Component{
    // removeHandler = (id) =>{
    //     this.props.RemoveProductCategories(id);
    //     console.log(id);
    // }
    updateHandler = (id) =>{
        this.props.SingleProductCategories(id);
        this.props.history.replace('/admin/ProductCategoriesEdit');
    }
    
    renderProductCategories = (categories) => {
        //   debugger;
        return categories.map((product_categories, index) => 
            <tr key={"index"+index+1}>
                <td>{index+1}</td>
                <td>{product_categories.name}</td>
                <td>{product_categories.description}</td>
                <td><Button variant="info" onClick={() => this.updateHandler(product_categories.id)}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => this.props.RemoveProductCategories(product_categories.id)}>Delete</Button></td>
            </tr>
        )
    }
   
    render(){
        return <Table responsive striped bordered hover size="sm">
        <thead>
        <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            { this.renderProductCategories(this.props.product_categories) }
        </tbody>
    </Table>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        RemoveProductCategories: (id) => dispatch(RemoveProductCategories(id)),
        SingleProductCategories: (id) => dispatch(SingleProductCategories(id))
    }
}

export default connect(null, mapDispatchToProps)(ProductCategoriesList);