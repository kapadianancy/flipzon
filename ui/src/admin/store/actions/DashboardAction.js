import * as types from '../ActionTypes'
import axios from 'axios'

export const fetchTotal = () => {
    return async dispatch => {
        dispatch({
            type:types.INIT_TOTAL
        }) 
        await axios.get('http://localhost:8080/admin/dashboard').then(response => {
            dispatch({
                type:types.FETCH_TOTAL_SUCCESS,
                total:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_TOTAL_FAILED,
                error:error.message
            });
        })
    };
};

export const fetchProductTotal = () => {
    return async dispatch => {
        dispatch({
            type:types.INIT_PRODUCT_TOTAL
        }) 
        await axios.get('http://localhost:8080/admin/dashboardProduct').then(response => {
            dispatch({
                type:types.FETCH_PRODUCT_TOTAL_SUCCESS,
                totals:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_TOTAL_FAILED,
                error:error.message
            });
        })
    };
};