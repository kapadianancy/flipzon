import * as types from '../ActionTypes'
import axios from 'axios'

export const fetchOrders = () => {
    return async dispatch => {
        dispatch({
            type:types.INIT_FETCH_ORDERS
        }) 
        await axios.get('http://localhost:8080/admin/orders').then(response => {
            console.log(response.data);
            dispatch({
                type:types.FETCH_ORDERS_SUCCESS,
                orders:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_ORDERS_FAILED,
                error:error.message
            });
        })
    };
};

export const updateOrders = (id,put) => {
   
    return async dispatch => {
        dispatch({
            type:types.INIT_FETCH_ORDERS
        }) 
        await axios.put('http://localhost:8080/admin/orders/'+id,put).then(response => {
            dispatch({
                type:types.UPDATE_ORDERS,
                orders:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_ORDERS_FAILED,
                error:error.message
            });
        })
    };
};