import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './ProductList.module.css'
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RemoveProductCategories,SingleProductCategories } from '../../store/actions/Product_CategoriesActions'
class ProductCategoriesList extends Component{
    state = {
        searchValue:""
    }
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
                        <Button onClick={() => { this.props.RemoveProductCategories(id)
                            onClose(); }}> Yes, Delete it! </Button>
                        </td>
                        <td>
                            <Button onClick={onClose}>No, Delete</Button>
                        </td>
                    </tr>
                    </thead>
                </table>
            );
            }
        });
        }

        renderProductCategories = (product_categories, activeOld, perPage) => {
            let filtered="";
            if(this.state.searchValue)
            {
                filtered = product_categories.filter((item) => (
                            this.state.searchValue.match(item.name)
                        ));   

                return filtered.map((prod,i) => 
                <tr key={prod.id}>
                    <td>{i+1}</td>
                    <td>{prod.name}</td>
                    <td><img src={"http://localhost:8080"+((prod.image).replace('/public',''))} alt="description" width="50px"/></td>
                    <td><Button variant="info" onClick={() => this.updateHandler(prod.id)} as={Link} to={`/admin/ProductCategoriesEdit/${prod.id}`}>Edit</Button></td>
                    <td><Button variant="danger" onClick={() => this.submit(prod.id)}>Delete</Button></td>
                </tr>
                )   
            }
            let product_categoriesArr = [];
            let active = (activeOld-1)*perPage;
            for(let i=active;i<(activeOld*perPage);i++) {
                if(product_categories[i]) {
                    product_categoriesArr.push(
                        <tr key={product_categories[i].id}>
                            <td>{i+1}</td>
                            <td>
                            {/* <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={i+1}> */}
                                    {product_categories[i].name}
                                 {/* </Accordion.Toggle>
                                <td><Accordion.Collapse eventKey={i+1}>
                                    <Card.Body>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Row>
                                            <Col>
                                                <Form.Control type="text"/>
                                            </Col>
                                            <Col>
                                                <Button>+</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>    
                                    </Card.Body> 
                                </Accordion.Collapse></td>
                            </Card>
                            </Accordion> */}
                            </td>
                            <td><img src={"http://localhost:8080"+((product_categories[i].image).replace('/public',''))} alt="description" width="50px"/></td>
                            <td><Button variant="info" onClick={() => this.updateHandler(product_categories[i].id)} as={Link} to={`/admin/ProductCategoriesEdit/${product_categories[i].id}`}>Edit</Button></td>
                            <td><Button variant="danger" onClick={() => this.submit(product_categories[i].id)}>Delete</Button></td>
                        </tr>
                    )
                }
            }
            return product_categoriesArr;
        }
        
   
    render(){
        // let items = [];
        return <> 
        <input type="text" placeholder="Enter Search Here..." className={"form-control"} onKeyUp={(event) => this.setState({searchValue: event.target.value})}/> 
        <Table responsive striped bordered hover size="sm">
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
            { this.props.loading ? <Spinner animation="border" /> : this.renderProductCategories(this.props.product_categories, this.props.active, this.props.perPage) }
        </tbody>
        
    </Table></>
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