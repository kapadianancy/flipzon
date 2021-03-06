import * as types from '../Types'

const initialStore = {
    products: [],
    product: {},
    total: null,
    loading: false,
    error: null,
    OOSProducts: null,
    oLoading: false,
    oError: null,
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
                error: null,
                total: null
            };
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products,
                total: action.total
            }
        case types.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_ADD_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.ADD_PRODUCT_SUCCESS:
            // let products = state.products.concat(action.product);
            return {
                ...state,
                loading: false,
            }
        case types.ADD_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_FETCH_ONE_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null,
                product: {}
            }
        case types.FETCH_ONE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.product
            }
        case types.FETCH_ONE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_EDIT_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case types.EDIT_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.DELETE_PRODUCT_SUCCESS:
            let products = state.products.filter( product => product.id !== action.product_id )
            return {
                ...state,
                loading: false,
                products
            }
        case types.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_DELETE_PRODUCT_IMAGE:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.DELETE_PRODUCT_IMAGE_SUCCESS:
            let images = state.product.images.filter( image => !action.image_ids.has(image.id) )
            return {
                ...state,
                loading: false,
                product: {
                    ...state.product,
                    images
                }
            }
        case types.DELETE_PRODUCT_IMAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_EDIT_OFFER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.EDIT_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case types.EDIT_OFFER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.INIT_FETCH_OOS_PRODUCTS:
            return {
                ...state,
                OOSProducts: null,
                oLoading: true,
                oError: null,
            }
        case types.FETCH_OOS_PRODUCTS_SUCCESS:
            return {
                ...state,
                OOSProducts: action.data,
                oLoading: false
            }
        case types.FETCH_OOS_PRODUCTS_FAILED:
            return {
                ...state,
                oLoading: false,
                error: action.error
            }
        case types.REMOVE_OOS_PRODUCT:
            let newOOSProducts = state.OOSProducts.filter( product => product.id !== action.id )
            return {
                ...state,
                OOSProducts: newOOSProducts
            }
        default:
            return state;
    }
}

export default store;