import * as types from '../actionNames'

const initialStore = {
    products: [],
    images: [],
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {

        case types.CATEGORY_PRODUCT:
            return {
                ...state,
                products: action.products

            }
        case types.CATEGORY_PRODUCT_FAILED:
            return {
                ...state,
                error: action.error
            }
        case types.ORDERED_PRODUCT:
            return {
                ...state,
                products: action.products
            }
        case types.DISPLAY_SINGLE_PRODUCT:
            return {
                ...state,
                products: action.products,
                images: action.images
            }
        case types.DISPLAY_SINGLE_PRODUCT_FAILED:
            return {
                ...state,
                error: action.error
            }
            case types.SEARCH_PRODUCT:
                return{
                    ...state,
                    products:action.products
                }
        default:
            return state;
    }
}

export default store;