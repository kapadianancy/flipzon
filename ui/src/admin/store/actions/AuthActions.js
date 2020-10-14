import * as types from '../Types'
import axios from '../../../axios'

export const login = (email, password) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_LOGIN });
        var result;
        try {
            result = await axios.post("admin/login", {
                email, password
            });
            localStorage.setItem("fz_token", result.data.token);
            dispatch({ type: types.LOGIN_SUCCESS, token: result.data.token, user: result.data.user });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAILED, error: "Invalid Email/Password!" });
            throw error;
        }
    }
}

export const register = (user) => {
    return async (dispatch) => {
        dispatch({ type: types.INIT_REGISTER });
        try {
            await axios.post("admin/register", user);
            dispatch({ type: types.REGISTER_SUCCESS });
        } catch (error) {
            let message = "Network Error";
            if(error.response.status === 422) {
                message = error.response.data.message;
            }
            dispatch({ type: types.REGISTER_FAILED, error: message });
            throw error;
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

export const forgotPassword = (email) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_FORGOT_PASSWORD });
        try {
            const { data } = await axios.post("admin/forgotPassword", { email });
            dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, message: data.message });
        } catch (error) {
            let message = "Network Error";
            if(error.response.status === 422) {
                message = error.response.data.message;
            }
            dispatch({ type: types.FORGOT_PASSWORD_FAILED, error: message });
        }
    }
}

export const tryAutoLogin = () => {
    return async(dispatch) => {
        // dispatch({ type: types.INIT_LOGIN });
        try {
            let token = localStorage.getItem("fz_token");
            if(!token) {
                return;
            }
            let result = await axios.get("admin/me", {
                headers: {
                    'Authorization': token
                }
            });
            dispatch({ type: types.AUTO_LOGIN_SUCCESS, token, user: result.data });
        } catch(error) {
            // console.log(error);
            // dispatch({ type: types.LOGIN_FAILED, error: error.message })
        }
    }
}

export const updateProfile = (data) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_UPDATE_PROFILE });
        try {
            let token = localStorage.getItem("fz_token");
            await axios.post("admin/updateProfile", data, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch({ type: types.UPDATE_PROFILE_SUCCESS, username: data.username });
        } catch(error) {
            let message = "Network Error";
            if(error.response.status === 422) {
                message = error.response.data.message;
            }
            dispatch({ type: types.UPDATE_PROFILE_FAILED, error: message })
            throw error
        }
    }   
}

export const checkLink = async (iv, data) => {
    try {
        await axios.get(`admin/checkLink?iv=${iv}&data=${data}`);
    } catch (error) {
        throw error
    }
}

export const resetPassword = (iv, data, password) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_RESET_PASSWORD });
        try {
            let result = await axios.post(`/admin/resetPassword?iv=${iv}&data=${data}`, { password });
            dispatch({ type: types.RESET_PASSWORD_SUCCESS, message: result.data.message });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.RESET_PASSWORD_FAILED, error: error.message });
        }
    }
}