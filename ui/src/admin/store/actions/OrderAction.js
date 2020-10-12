import * as types from '../ActionTypes'
import axios from '../../../axios'

export const fetchOrders = () => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_FETCH_ORDERS
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/orders',{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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

export const fetchOrdersDetails = (id) => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_FETCH_ORDERS_DETAILS
        })
        let token = getState().adminAuth.token 
        await axios.get('admin/allorders/'+id,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.FETCH_ORDERS_DETAILS_SUCCESS,
                ordersDetails:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_ORDERS_DETAILS_FAILED,
                error:error.message
            });
        })
    };
};

export const updateOrders = (id,status,put) => {
   
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_UPDATE_ORDERS
        }) 
        
        let token = getState().adminAuth.token
        var request = {
            params: {
              id:id,
              status:status
            }
          }
        await axios.put('admin/orders/'+request.params.id+'/'+request.params.status,put,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.UPDATE_ORDERS_SUCCESS,
                orders_id:id
            });
        }).catch(error => {
            dispatch({
                type:types.UPDATE_ORDERS_FAILED,
                error:error.message
            });
        })
    };
};