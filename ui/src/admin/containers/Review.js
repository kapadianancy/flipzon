import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import {fetchReview,removeReview} from '../store/actions/ReviewAction';
import ReviewList from '../components/Review/ReviewList';
import * as classes from './Users.module.css'
const renderPaginationItems = (total, active, changeActive) => {
    let items = [];
    for(let i=1;i<=total;i++) {
        i===active 
        ? items.push(<Pagination.Item key={i} active>{i}</Pagination.Item>)
        : items.push(<Pagination.Item key={i} onClick={ () => changeActive(i)}>{i}</Pagination.Item>)
    }
    return items
}
const Review = (props) => {
    const [perPage, setPerPage] = useState(5)
    const [active, setActive] = useState(1)

    useEffect(() => {
        props.fetchReview(active,perPage);
    }, [props.fetchReview,active,perPage]);
    const changeActive = (index) => {
        setActive(index);
    }
    let review = <Spinner animation="border" />;
    if(!props.loading && props.review) {
        review = <ReviewList removeReview={props.removeReview} review={props.review} active={(active-1)*perPage}/>
    }
    return(
        <>
        <Card>
            <Card.Header className={classes.Header}>
                <div className={classes.Title}>
                    Review List
                </div>
            </Card.Header>
            <Card.Body>
                {review}
            </Card.Body>
            <Card.Footer className={classes.Footer}>
            {
                props.review ?
                <Pagination className={classes.Pagination} >
                    { renderPaginationItems(props.total, active, changeActive) }
                </Pagination> : null
            }
            <Form.Control as="select" value={perPage} custom className={classes.Select} onChange={ (e) => { setActive(1);setPerPage(e.target.value) } }>
                <option>2</option>  
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
            </Form.Control>
            </Card.Footer>
        </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        review:state.adminReviewReducer.review,
        total:state.adminReviewReducer.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReview : (page,limit) => dispatch(fetchReview(page,limit)),
        removeReview: (id) => dispatch(removeReview(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);