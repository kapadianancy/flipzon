import * as types from '../Types'

const initialState = {
    users: null,
    totalUsers: null,
    loading: false,
    error: null,
    userOrders: null,
    ordersLoading: false,
    ordersError: null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case types.INIT_FETCH_USERS:
            return {
                ...state,
                loading: true,
                error: null,
                users: null,
                totalUsers: null
            }
        case types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users,
                totalUsers: action.total
            }
        case types.FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_FETCH_USER_ORDERS:
            return {
                ...state,
                ordersLoading: true,
                userOrders: null,
                ordersError: null
            }
        case types.FETCH_USER_ORDERS_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                userOrders: action.orders,
            }
        case types.FETCH_USER_ORDERS_FAILED:
            return {
                ...state,
                ordersLoading: false,
                ordersError: action.error
            }
        case types.DELETE_USER_SUCCESS:
            let users = state.users.filter( user => user.id !== action.userId )
            return {
                ...state,
                users
            }
        case types.DELETE_USER_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer