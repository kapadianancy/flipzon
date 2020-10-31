import * as types from "../actionNames";

const initialStore = {
    userId: "",
    token: "",
    error: "",
    message: "",
    otp:"",
    orderItems: []
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return {
                ...state,
                //orderItems: action.orderItems,
                error: "",
            };
        case types.ADD_TO_CART_FAILED:
            return {
                ...state,
                error: action.error
            };
        case types.VIEW_CART:
            return {
                ...state,
                orderItems: action.orderItems
            }
        case types.VIEW_ORDER_DETAILS:
            return {
                ...state,
                orderItems: action.orderItems
            }
        case types.PLACE_ORDER:
            return {
                ...state,
                message: action.message
            }

        case types.PLACE_ORDER_FAILED:
            return {
                ...state,
                error: action.error
            }

        case types.REMOVE_ORDER_ITEM:
            return {
                ...state,
                message: action.message
            }
        case types.UPDATE_ORDER:
            return {
                ...state,
                message: action.message
            }
        case types.CANCEL_ORDER:
            return {
                ...state,
                message: action.message
            }
        case types.SEND_OTP:
            return {
                ...state,
                otp: action.otp
            }

        default:
            return state;
    }
};

export default store;
