import * as types from '../ActionTypes'

const initialStore = {
    total:{},
    totals:{},
    loading: false,
    error: "",
    revtotal:{}
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.INIT_TOTAL:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_TOTAL_SUCCESS:
            return {
                ...state,
                total: action.total,
                loading: false
            }
        case types.FETCH_TOTAL_FAILED:
            return {
                ...state,
                loading: false,
                error:action.error
            }    
        case types.INIT_PRODUCT_TOTAL:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_PRODUCT_TOTAL_SUCCESS:
            return {
                ...state,
                totals: action.totals,
                loading: false
            }
        case types.FETCH_PRODUCT_TOTAL_FAILED:
            return {
                ...state,
                loading: false,
                error:action.error
            }        
        case types.INIT_REVENUE_TOTAL:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_REVENUE_TOTAL_SUCCESS:
            return {
                ...state,
                revtotal: action.revtotal,
                loading: false
            }
        case types.FETCH_REVENUE_TOTAL_FAILED:
            return {
                ...state,
                loading: false,
                error:action.error
            }                          
        default:
            return state;
    }
}

export default store;