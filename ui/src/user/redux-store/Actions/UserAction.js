import * as types from '../actionNames';
import axiosInstance from '../../../axios';

export const signup = (user) => {
    return async dispatch => {
        await axiosInstance.post('/client/signup',user).then(response => {
            dispatch({
                type: types.SIGNUP,
                user : response.data.user,
                token : response.data.token
            });
        }).catch(error => {
            dispatch({
                type: types.SIGNUP_FAILED,
                error: error.message
            });
        })
    };
};