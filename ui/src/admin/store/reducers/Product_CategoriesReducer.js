import * as types from '../ActionTypes'

const initialStore = {
    product_categories: [],
    product_categorie:{},
    loading: false,
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        //Fetch Data
        case types.INIT_FETCH_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
            };
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
                error:action.error
            }    
        // Add Data
        case types.INIT_ADD_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: action.error
            }
        case types.ADD_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case types.ADD_PRODUCT_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        // Update Data
        case types.INIT_UPDATE_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: action.error
            }
        case types.UPDATE_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                product_categories: action.product_categories,
                loading: false
            }
        case types.UPDATE_PRODUCT_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // REMOVE Data 
        case types.INIT_REMOVE_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: action.error
            }
        case types.REMOVE_PRODUCT_CATEGORIES_SUCCESS:
            let categories = state.product_categories.filter(category => category.id !== action.product_categories_id);
            return {
                ...state,
                product_categories:categories,
                loading: false
            };
        case types.REMOVE_PRODUCT_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // FETCH SINGLE Data    
        case types.INIT_SINGLE_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: action.error
            }
        case types.FETCH_SINGLE_CATEGORIES_SUCCESS:
            return {
                ...state,
                product_categorie: action.product_categorie,
                loading: false
            }
        case types.FETCH_SINGLE_CATEGORIES_FAILED:
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