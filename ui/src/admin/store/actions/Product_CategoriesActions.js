import * as types from '../ActionTypes'
import axios from 'axios'

export const fetchProductCategories = () => {
    return async dispatch => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        await axios.get('http://localhost:8080/admin/product_categories').then(response => {
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
    return async dispatch => {
        dispatch({
            type:types.INIT_ADD_PRODUCT_CATEGORIES
        }) 
        await axios.post('http://localhost:8080/admin/product_categories',post).then(response => {
            dispatch({
                type:types.ADD_PRODUCT_CATEGORIES_SUCCESS,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.ADD_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const RemoveProductCategories = (id) => {
   
    return async dispatch => {
        dispatch({
            type:types.INIT_REMOVE_PRODUCT_CATEGORIES
        }) 
        await axios.put('http://localhost:8080/admin/categories/'+id).then(response => {    
            dispatch({
                type:types.REMOVE_PRODUCT_CATEGORIES_SUCCESS,
                product_categories_id : id
            });
        }).catch(error => {
            dispatch({
                type:types.REMOVE_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const SingleProductCategories = (id) => {
    
    return async dispatch => {
        dispatch({
            type:types.INIT_SINGLE_PRODUCT_CATEGORIES
        }) 
        await axios.get('http://localhost:8080/admin/product_categories/'+id).then(response => {
            dispatch({
                type:types.FETCH_SINGLE_CATEGORIES_SUCCESS,
                product_categorie:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_SINGLE_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const updateProductCategories = (id,put) => {
   
    return async dispatch => {
        dispatch({
            type:types.INIT_UPDATE_PRODUCT_CATEGORIES
        }) 
        await axios.put('http://localhost:8080/admin/product_categories/'+id,put).then(response => {
            dispatch({
                type:types.UPDATE_PRODUCT_CATEGORIES_SUCCESS,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.UPDATE_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};