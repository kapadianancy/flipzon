import * as types from '../actionNames';

const initialStore = {
    userId: "",
    message: "",
    token: "",
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.SIGNUP:
            return {
                ...state,
                userId: action.user,
                token: action.token,
                error: ""
            }
        case types.SIGNUP_FAILED:
            return {
                ...state,
                error: action.error
            }
        case types.FORGET_PASSWORD:
            return {
                ...state,
                message : action.message
            }
        case types.FORGET_PASSWORD_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};


export default store;
