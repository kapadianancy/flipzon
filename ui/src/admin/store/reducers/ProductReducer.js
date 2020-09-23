import * as types from '../Types'

const initialStore = {
    products: [
        { id: 1, name: "LG Computer", price: 1200, category: "Electronics", stock: 10 },
        { id: 2, name: "LG Computer", price: 1200, category: "Electronics", stock: 10 },
        { id: 3, name: "LG Computer", price: 1200, category: "Electronics", stock: 10 },
        { id: 4, name: "LG Computer", price: 1200, category: "Electronics", stock: 10 }
    ],
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
                error: ""
            }
        default:
            return state;
    }
}

export default store;