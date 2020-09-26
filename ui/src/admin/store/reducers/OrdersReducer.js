import * as types from '../ActionTypes'

const initialStore = {
    orders: [],
    ordersDetails: [],
    order:{},
    loading: false,
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_FETCH_ORDERS_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_ORDERS_DETAILS_SUCCESS:
            return {
                ...state,
                ordersDetails: action.ordersDetails,
                loading: false
            }
        case types.FETCH_ORDERS_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error:action.error
            }    
        case types.INIT_FETCH_ORDERS:
            return {
                ...state,
                loading: true,
            };    
        case types.UPDATE_ORDERS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };    
        case types.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case types.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default store;