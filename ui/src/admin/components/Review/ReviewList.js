import React,{Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class ReviewList extends Component {
    state = {
        id:"",
        show:false,
        data:[],
        direction:"default"
    }
    handleShow = (id) => { 
        this.setState({id:id,show: true })
    };
    handleHide = () => {
		this.setState({ show: false });
    };
    removeHandler = () => {
        this.props.removeReview(this.state.id)
        this.setState({ show: false });
    }
    renderReview = (review,active) => {
        return review.map((review, index) => 
            <tr key={review.id}>
                <td>{index+1+active}</td>
                <td>{review.review}</td>
                <td>{review.product.name}</td>
                <td>{review.user.username}</td>
                <td>{review.rating}</td>
                <td>{new Date(review.updatedAt).toLocaleDateString()}</td>
                <td><Button onClick={() => this.handleShow(review.id)} variant="danger">Delete</Button></td>
            </tr>
        )
    } 
    onSortDate(event, sortKey,d){
        const data = this.props.review;
        if(d==='a')
        {
            data.sort((a,b) => new Date(a[sortKey]) - new Date(b[sortKey]))
            this.setState({direction:'decending'})
        }
        else
        {
            data.sort((a,b) => new Date(b[sortKey]) - new Date(a[sortKey]))
            this.setState({direction:'acending'})
        }
    }  
    onSortString(event, sortKey,d){
        const data = this.props.review;
        if(d==='a')
        {
            data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
            this.setState({direction:'decending'})
        }
        else
        {
            data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
            this.setState({direction:'acending'})
        }
    }
    onSortNumber(event, sortKey,d){
        const data = this.props.review;
        if(d==='a')
        {
            data.sort((a,b) => a[sortKey] - b[sortKey])
            this.setState({direction:'decending'})
        }
        else
        {
            data.sort((a,b) => b[sortKey] - a[sortKey])
            this.setState({direction:'acending'})
        }
    } 
    render(){
        return <><Table responsive striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Review <span onClick={e => this.onSortString(e, 'review','a')}>&#8593;</span><span onClick={e => this.onSortString(e, 'review','b')}>&#8595;</span></th>
                <th>Product <span onClick={e => this.onSortNumber(e, 'productId','a')}>&#8593;</span><span onClick={e => this.onSortNumber(e, 'productId','b')}>&#8595;</span></th>
                <th>UserName <span onClick={e => this.onSortNumber(e, 'userId','a')}>&#8593;</span><span onClick={e => this.onSortNumber(e, 'userId','b')}>&#8595;</span></th>
                <th>Rate <span onClick={e => this.onSortNumber(e, 'rating','a')}>&#8593;</span><span onClick={e => this.onSortNumber(e, 'rating','b')}>&#8595;</span></th>
                <th>Date <span onClick={e => this.onSortDate(e, 'updatedAt','a')}>&#8593;</span><span onClick={e => this.onSortDate(e, 'updatedAt','b')}>&#8595;</span></th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            { this.renderReview(this.props.review,this.props.active) }
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
    </>
    }
} 
export default ReviewList