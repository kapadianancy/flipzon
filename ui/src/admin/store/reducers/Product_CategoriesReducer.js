import * as types from '../ActionTypes'

const initialStore = {
    product_categories: [],
    loading: false,
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_FETCH_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
            };
        case types.ADD_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories: action.product_categories,
                loading: true
            };
        case types.UPDATE_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories: action.product_categories,
                // product_categories: action.product_categories.map(    
                //     (content, i) => content.id === action.product_categories_id ? {...content, product_categories: action.product_categories} : content),
                loading: true
            };    
        case types.REMOVE_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories_id : action.product_categories_id,
                loading: true
            };    
        case types.SINGLE_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories: action.product_categories,
                loading: false
            }
        case types.FETCH_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                product_categories: action.product_categories,
                loading: false
            }
        case types.FETCH_PRODUCT_CATEGORIES_FAILED:
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