import * as types from '../actionNames';
import axiosInstance from '../../../axios';

export const signup = (user) => {
    return async dispatch => {
<<<<<<< HEAD
        await axiosInstance.post('/client/signup',user).then(response => {
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userId",response.data.user.id);
=======
        await axiosInstance.post('/client/signup', user).then(response => {
>>>>>>> 818c9a25cb4aa39bca99eaa4f8196d0d723b33ab
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

<<<<<<< HEAD
export const login = (user) => {
    return async dispatch => {
        await axiosInstance.post('/client/login',user).then(response => {
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userId",response.data.user.id);
            dispatch({
                type: types.LOGIN,
                user : response.data.user.id,
                token : response.data.token
            });
        }).catch(error => {
            dispatch({
                type: types.LOGIN_FAILED,
=======
export const forgetpassword = (email) => {
    return async dispatch => {
        await axiosInstance.post('/client/forgetPassword',email).then(response => {
            dispatch({
                type: types.FORGET_PASSWORD,
                message : response.data
            });
        }).catch(error => {
            dispatch({
                type: types.FORGET_PASSWORD_FAILED,
>>>>>>> 818c9a25cb4aa39bca99eaa4f8196d0d723b33ab
                error: error.message
            });
        })
    };
<<<<<<< HEAD
};


export const logout=()=>
{
    
    const token=localStorage.getItem("token");
    return async dispatch=>
    {
        await axiosInstance.get("/client/logout", {
            headers: {
              authorization: 'Bearer '+token
            }
            }).then(response=>
                {   
                    
                    dispatch({
                        type:types.LOGOUT,
                    })

                }).catch(error=>
                    {
                        console.log("error----"+error);
                    })
    }
}
=======
};
>>>>>>> 818c9a25cb4aa39bca99eaa4f8196d0d723b33ab
