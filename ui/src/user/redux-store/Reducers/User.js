import * as types from '../actionNames';

const initialStore = {

    user: {},
    token : "",
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.SIGNUP:
            return {
                ...state,
                user: action.user,
                token : action.token
            }
        case types.SIGNUP_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};


export default store;
