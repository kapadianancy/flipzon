import * as types from '../Types'
import axios from '../../../axios'

export const login = (email, password) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_LOGIN });
        var result;
        try {
            result = await axios.post("login", {
                email, password
            });
            localStorage.setItem("fz_token", result.data.token);
            dispatch({ type: types.LOGIN_SUCCESS, token: result.data.token, user: result.data.user });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAILED, error: "Invalid Username/Password!" });
        }
    }
}

export const register = (user) => {
    return async (dispatch) => {
        dispatch({ type: types.INIT_REGISTER });
        let result;
        try {
            result = await axios.post("register", user);
            dispatch({ type: types.REGISTER_SUCCESS });
        } catch (error) {
            let message = "Network Error";
            if(error.response.status === 422) {
                message = error.response.data.message;
            }
            dispatch({ type: types.REGISTER_FAILED, error: message });
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: types.INIT_LOGOUT });
        try {
            localStorage.removeItem("fz_token");
            dispatch({ type: types.LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: types.LOGOUT_FAILED });
        }
    }
}


export const tryAutoLogin = () => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_LOGIN });
        try {
            let token = localStorage.getItem("fz_token");
            if(!token) {
                throw { message: "Token not found!" }
            }
            let result = await axios.get("me", {
                headers: {
                    'Authorization': token
                }
            });
            dispatch({ type: types.LOGIN_SUCCESS, token, user: result.data });
        } catch(error) {
            dispatch({ type: types.LOGIN_FAILED, error: error.message })
        }
    }
}