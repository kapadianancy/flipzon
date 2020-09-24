import * as types from '../ActionTypes'
import axios from 'axios'

export const fetchProductCategories = () => {
    return dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        axios.get('http://localhost:8080/admin/product_categories').then(response => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_SUCCESS,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const AddProductCategories = (post) => {
    return dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        axios.post('http://localhost:8080/admin/product_categories',post).then(response => {
            dispatch({
                type:types.ADD_PRODUCT_CATEGORIES,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const RemoveProductCategories = (id) => {
    debugger;
    return dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        axios.delete('http://localhost:8080/admin/product_categories/'+id).then(response => {
            dispatch({
                type:types.REMOVE_PRODUCT_CATEGORIES,
                product_categories:response.data,
                product_categories_id : id
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const SingleProductCategories = (id) => {
 
    return dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        axios.get('http://localhost:8080/admin/product_categories/'+id).then(response => {
            console.log("console"+response.data);
            dispatch({
                type:types.SINGLE_PRODUCT_CATEGORIES,
                product_categories:response.data,
                //product_categories_id : id
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const updateProductCategories = (id,put) => {
    debugger;
    return dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        axios.put('http://localhost:8080/admin/product_categories/'+id,put).then(response => {
            dispatch({
                type:types.UPDATE_PRODUCT_CATEGORIES,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};