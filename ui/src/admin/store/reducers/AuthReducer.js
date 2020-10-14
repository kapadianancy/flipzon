import * as types from '../Types'

const initialStore = {
    token: null,
    user: null,
    loading: false,
    loginError: null,
    registerError: null,
    updateError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    message: null
}

const state = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_LOGIN:
            return {
                ...state,
                loading: true,
                loginError: null,
                token: null,
                user: null
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                user: action.user,
            }
        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                loginError: action.error
            }
        case types.INIT_REGISTER:
            return {
                ...state,
                loading: true,
                token: null,
                registerError: null,
                user: null
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case types.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                registerError: action.error
            }
        case types.INIT_LOGOUT:
            return {
                ...state,
                loading: true,
                logoutError: null
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                token: null,
                user: null
            }
        case types.LOGOUT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_UPDATE_PROFILE:
            return {
                ...state,
                loading: true,
                updateError: null
            }
        case types.UPDATE_PROFILE_SUCCESS:
            const user = {
                ...state.user,
                username: action.username
            }
            return {
                ...state,
                loading: false,
                user
            }
        case types.UPDATE_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                updateError: action.error
            }
        case types.AUTO_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                user: action.user,
            }
        case types.INIT_FORGOT_PASSWORD:
            return {
                ...state,
                loading: true,
                forgotPasswordError: null
            }
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case types.FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                forgotPasswordError: action.error
            }
        case types.INIT_RESET_PASSWORD:
            return {
                ...state,
                loading: true,
                resetPasswordError: null,
                message: null
            }
        case types.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case types.RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                resetPasswordError: action.error
            }
        default:
            return state;
    }
}

export default state