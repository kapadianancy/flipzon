import * as types from '../actionNames'

const initialStore = {
    product_categories: [],
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        
        case types.FETCH_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                product_categories: action.product_categories
             
            }
        case types.FETCH_PRODUCT_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default store;