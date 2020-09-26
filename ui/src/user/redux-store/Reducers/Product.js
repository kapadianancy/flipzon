import * as types from '../actionNames'

const initialStore = {
    products: [],
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
           return{
               ...state,
               error:action.error
           }
        default:
            return state;
    }
}

export default store;