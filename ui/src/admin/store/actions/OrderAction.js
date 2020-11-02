import * as types from '../ActionTypes'
import axios from '../../../axios'

export const fetchOrders = (page,limit) => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_FETCH_ORDERS
        }) 
        let token = getState().adminAuth.token
        let query = "";
        if(page && limit)
        {
            query = `admin/orders/?page=${page}&limit=${limit}`;
        }else
        {
            query = 'admin/orders/' 
        }
        await axios.get(query,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.FETCH_ORDERS_SUCCESS,
                orders:response.data.orders,
                total:response.data.total
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_ORDERS_FAILED,
                error:error.message
            });
        })
    };
};

export const fetchOrderBill = (id) => {
    return async (dispatch) => {
        dispatch({
            type:types.INIT_ORDER_BILL
        }) 
        // let token = getState().adminAuth.token
        await axios.get('admin/orderBill/'+id).then(response => {
            dispatch({
                type:types.FETCH_ORDER_BILL_SUCCESS,
                orderBill:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_ORDER_BILL_FAILED,
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
                orders_id:id,
                orders:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.UPDATE_ORDERS_FAILED,
                error:error.message
            });
        })
    };
};