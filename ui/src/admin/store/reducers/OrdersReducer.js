import * as types from '../ActionTypes'

const initialStore = {
    orders: [],
    ordersDetails: [],
    order:{},
    orderBill:[],
    loading: false,
    error: "",
    total: null
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
        case types.INIT_ORDER_BILL:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_ORDER_BILL_SUCCESS:
            return {
                ...state,
                orderBill: action.orderBill,
                loading: false
            }
        case types.FETCH_ORDER_BILL_FAILED:
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
        case types.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                total:action.total
            }
        case types.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_UPDATE_ORDERS:
            return {
                ...state,
                loading: true,
            };    
        case types.UPDATE_ORDERS_SUCCESS:
            let order = state.orders.filter(order => order.id === action.order_id);
            return {
                ...state,
                orders: order,
                loading: false
            };
        case types.UPDATE_ORDERS_FAILED:
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