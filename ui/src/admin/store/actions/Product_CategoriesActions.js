import * as types from '../ActionTypes'
import axios from '../../../axios'

export const fetchProductCategories = () => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/product_categories',{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_ADD_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.post('admin/product_categories',post,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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
   
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_REMOVE_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.put('admin/categories/'+id,{
            headers: {
                "Authorization": token
            }
        }).then(response => {    
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
    
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_SINGLE_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.get('admin/product_categories/'+id,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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
   
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_UPDATE_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.put('admin/product_categories/'+id,put,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
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