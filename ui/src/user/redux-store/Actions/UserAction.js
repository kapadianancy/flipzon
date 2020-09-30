import * as types from '../actionNames';
import axiosInstance from '../../../axios';

export const signup = (user) => {
    return async dispatch => {
        await axiosInstance.post('/client/signup', user).then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            dispatch({
                type: types.SIGNUP,
                user: response.data.user.id,
                token: response.data.token
            });
        }).catch(error => {
            dispatch({
                type: types.SIGNUP_FAILED,
                error: error.message
            });
        })
    };
};


export const login = (user) => {
    return async dispatch => {
        await axiosInstance.post('/client/login', user).then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            dispatch({
                type: types.LOGIN,
                user: response.data.user.id,
                token: response.data.token
            });
        }).catch(error => {
            dispatch({
                type: types.LOGIN_FAILED,
                error: error.message
            });
        })
    };
};

export const forgetpassword = (email) => {
    return async dispatch => {
        await axiosInstance.post('/client/forgetPassword', email).then(response => {
            dispatch({
                type: types.FORGET_PASSWORD,
                message: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.FORGET_PASSWORD_FAILED,
                error: error.message
            });
        })
    };
};


export const logout = () => {

    const token = localStorage.getItem("token");
    return async dispatch => {
        await axiosInstance.get("/client/logout", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            dispatch({
                type: types.LOGOUT,
            })

        }).catch(error => {
            console.log("error----" + error);
        })
    }
}

export const getSingleUser = () => {
    const token = localStorage.getItem("token");
    //console.log("token----"+token);
    return async dispatch => {
        await axiosInstance.get("/client/getUserById", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {

            dispatch({
                type: types.GET_SINGLE_USER,
                error:"",
                user: response.data
            })

        }).catch(error => {
            dispatch({
                type: types.GET_SINGLE_USER_FAILED,
                error: error.message
            });
        })
    };
};

export const editprofile =  (user) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.put('/client/editProfile',user,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.EDIT_PROFILE,
                message : response.data
            });
        }).catch(error => {
            dispatch({
                type: types.EDIT_PROFILE_FAILED,
                error: error.message
            });
        })
    };
};