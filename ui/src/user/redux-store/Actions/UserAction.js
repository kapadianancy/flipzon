import * as types from '../actionNames';
import axiosInstance from '../../../axios';

export const signup = (user) => {
    return async dispatch => {
        await axiosInstance.post('/client/signup', user).then(async response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            if (localStorage.getItem("device") != null)
             {
                await axiosInstance.put("/client/updateUserId/" + localStorage.getItem("device"), {}, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                    .then(response => {
                        localStorage.removeItem("device");
                    }).catch(err => {
                        console.log("error in user id update");
                    })
            }
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

        await axiosInstance.post('/client/login', user).then(async (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            if (localStorage.getItem("device") != null) {
                await axiosInstance.put("/client/updateUserId/" + localStorage.getItem("device"), {}, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                    .then(response => {
                        localStorage.removeItem("device");
                    }).catch(err => {
                        console.log("error in user id update");
                    })
            }


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

export const updatepassword = (passwords) => {
    return async dispatch => {
        await axiosInstance.post('/client/updatepassword', passwords)
            .then(response => {
                dispatch({
                    type: types.CHANGE_PASSWORD,
                    message: response.data
                });
            }).catch(error => {
                dispatch({
                    type: types.CHANGE_PASSWORD_FAILED,
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
            localStorage.removeItem("device");
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
                error: "",
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

export const editprofile = (user) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.put('/client/editProfile', user, {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.EDIT_PROFILE,
                message: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.EDIT_PROFILE_FAILED,
                error: error.message
            });
        })
    };
};

export const changepassword = (passwords) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.put('/client/changePassword', passwords, {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.CHANGE_PASSWORD,
                message: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.CHANGE_PASSWORD_FAILED,
                error: error.message
            });
        })
    };
};

export const viewOrder = () => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        await axiosInstance.get('/client/viewOrder', {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.VIEW_ORDER,
                orders: response.data.orders
            });
        }).catch(error => {
            dispatch({
                type: types.VIEW_ORDER_FAILED,
                error: error.message
            });
        })
    };
};