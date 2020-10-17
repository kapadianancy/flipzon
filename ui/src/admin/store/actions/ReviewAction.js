import * as types from '../ActionTypes';
import axios from '../../../axios'

export const fetchReview = (page,limit) => {
    return async (dispatch) => {
        dispatch({
            type:types.INIT_REVIEW
        })
        // let token = getState().adminAuth.token
        let query = "";
        if(page && limit)
        {
            query = `admin/review/?page=${page}&limit=${limit}`;
        }else
        {
            query = 'admin/review/' 
        }
        await axios.get(query).then(response => {
            dispatch({
                type:types.FETCH_REVIEW_SUCCESS,
                review:response.data.review,
                total:response.data.total
            })
        }).catch(error=>{
            dispatch({
                type:types.FETCH_REVIEW_FAILED,
                error:error.message
            })  
        })
    }
}

export const removeReview = (id) => {
    return async (dispatch) => {
        dispatch({
            type:types.INIT_DELETE_REVIEW
        })
        // let token = getState().adminAuth.token
        axios.put('admin/review/'+id).then(response => {
            dispatch({
                type:types.FETCH_DELETE_REVIEW_SUCCESS,
                review_id:id
            })
        }).catch(error => {
            dispatch({
                type:types.FETCH_DELETE_REVIEW_FAILED,
                error:error.message
            })
        })
    }
}