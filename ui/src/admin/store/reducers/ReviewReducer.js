import * as types from '../ActionTypes';

const initalStore = {
    review:[],
    error:"",
    loading:false,
    review_id:"",
    total:null
}

const store  = (state=initalStore,action) => {
    switch (action.type) {
        case types.INIT_REVIEW:
            return{
                ...state,
                loading:true,
            }
        case types.FETCH_REVIEW_SUCCESS:
            return{
                ...state,
                review:action.review,
                total:action.total,
                loading:false
            }  
        case types.FETCH_REVIEW_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case types.INIT_DELETE_REVIEW:
            return{
                ...state,
                loading:true,
            }
        case types.FETCH_DELETE_REVIEW_SUCCESS:
            let rev = state.review.filter(reviews => reviews.id !== action.review_id)
            return{
                ...state,
                review:rev,
                loading:false,
            }  
        case types.FETCH_DELETE_REVIEW_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }    
        default:
            return state
    }
}
export default store;