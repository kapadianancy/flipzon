import * as types from '../actionNames'
import axiosInstance from '../../../axios';

export const addToCart = (pid,qty,uid) => {
    return async dispatch => {
        //const token = localStorage.getItem("token");
        const order = {
            "productId" : pid,
            "quantity" : qty,
            "userId":uid
        }
        await axiosInstance.post('/client/checkOrder', order).then(response => {
            dispatch({
                type: types.ADD_TO_CART,
                orderItems:response.data.orderItems
            });
        }).catch(error => {
            dispatch({
                type: types.ADD_TO_CART_FAILED,
                error: error.message
            });
        })
    };
};

export const viewCart = () => {
    return async dispatch => {
        let uid;
        //const token = localStorage.getItem("token");
       if(localStorage.getItem("userId")!=null)
       {
           uid=localStorage.getItem("userId");
       }
       else
       {
           uid=localStorage.getItem("device");
       }
       // alert("action------"+uid);
        await axiosInstance.get('/client/viewOrderCart/'+uid).then(response => {
            dispatch({
                type: types.VIEW_CART,
                orderItems:response.data
            });
        }).catch(error => {
           console.log(error);
        })
    };
};

export const placeOrder = (oid,status) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.put('/client/confirmOrder/'+oid,status,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.PLACE_ORDER,
                message:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.PLACE_ORDER_FAILED,
                error: error.message
            });
        })
    };
};


export const sendOTP = () => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.get('/client/sendOTP/',{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.SEND_OTP,
                otp:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};

export const removeOrderItem = (oid) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.delete('/client/cancelOrderItem/'+oid,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.REMOVE_ORDER_ITEM,
                message:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};

export const cancelOrder = (oid) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.delete('/client/cancelOrder/'+oid,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.CANCEL_ORDER,
                message:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};


export const updateOrder = (order) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.put('/client/updateOrder',order,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.UPDATE_ORDER,
                message:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};


export const viewOrderDetails = (oid) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
       
        await axiosInstance.get('/client/viewOrderDetails/'+oid,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.VIEW_ORDER_DETAILS,
                orderItems:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};