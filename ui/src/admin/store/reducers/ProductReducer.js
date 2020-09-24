import * as types from '../Types'

const initialStore = {
    products: [],
    loading: false,
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products,
                error: ""
            }
        case types.FETCH_PRODUCTS_FAILED:
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