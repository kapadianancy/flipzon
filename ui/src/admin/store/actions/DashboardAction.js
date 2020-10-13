import * as types from '../ActionTypes'
import axios from '../../../axios'

export const fetchTotal = () => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_TOTAL
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/dashboard',{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_PRODUCT_TOTAL
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/dashboardProduct',{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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

export const fetchRevenueTotal = () => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_REVENUE_TOTAL
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/dashboardProductRevenue',{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.FETCH_REVENUE_TOTAL_SUCCESS,
                revtotal:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_REVENUE_TOTAL_FAILED,
                error:error.message
            });
        })
    };
};