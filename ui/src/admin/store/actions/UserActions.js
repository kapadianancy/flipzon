import * as types from '../Types'
import axios from '../../../axios'

export const fetchUsers = (page, limit, type) => {
    return async (dispatch, getState) => {
        dispatch({ type: types.INIT_FETCH_USERS });
        try {
            let token = getState().adminAuth.token;
            let query = `?page=${page}&limit=${limit}&type=${type}`
            let response = await axios.get("admin/users"+query, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.FETCH_USERS_SUCCESS, users: response.data.users, total: response.data.total });
        } catch (error) {
            dispatch({ type: types.FETCH_USERS_FAILED, error: error.message });
        }
    }
}

export const fetchUserOrders = (userId) => {
    return async (dispatch, getState) => {
        dispatch({ type: types.INIT_FETCH_USER_ORDERS });
        try {
            let token = getState().adminAuth.token;
            let response = await axios.get(`admin/userOrders/${userId}`, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.FETCH_USER_ORDERS_SUCCESS, orders: response.data });
        } catch(error) {
            console.log(error);
            dispatch({ type: types.FETCH_USER_ORDERS_FAILED, error: error.message });
        }
    }
}

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let token = getState().adminAuth.token;
            await axios.delete(`admin/users/${userId}`, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.DELETE_USER_SUCCESS, userId });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.DELETE_USER_FAILED, error: error.message })
        }
    }
}