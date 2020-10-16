import * as types from '../ActionTypes'
import axios from '../../../axios'

export const fetchProductCategories = (page,limit) => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_FETCH_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        let query = "";
        if(page && limit)
        {
            query = `admin/product_categories/?page=${page}&limit=${limit}`;
        }else
        {
            query = 'admin/product_categories/'
        }
        await axios.get(query,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_SUCCESS,
                product_categories:response.data.product_categories,
                total:response.data.total
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error:error.message
            });
        })
    };
};

export const fetchParentCategories = (id) => {
    return async (dispatch) => {
        dispatch({
            type:types.INIT_PARENT_CATEGORY
        }) 
        await axios.get('admin/product_categoriesParent/'+id).then(response => {
            dispatch({
                type:types.FETCH_PARENT_CATEGORY_SUCCESS,
                categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_PARENT_CATEGORY_FAILED,
                error:error.message
            });
        })
    };
};

export const searchCategories = (search) => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_SEARCH
        }) 
        let token = getState().adminAuth.token
        await axios.get('/admin/categoriesSearch/'+search,{
            headers: {
                "Authorization": token
            }
        }).then(response => {
            dispatch({
                type:types.FETCH_SEARCH_SUCCESS,
                product_categories:response.data
            });
        }).catch(error => {
            dispatch({
                type:types.FETCH_SEARCH_FAILED,
                error:error.message
            });
        })
    };
};

export const AddProductCategories = (id,post) => {
    return async (dispatch,getState) => {
        dispatch({
            type:types.INIT_ADD_PRODUCT_CATEGORIES
        }) 
        let token = getState().adminAuth.token
        await axios.post('admin/product_categories/'+id,post,{
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
   
    return async (dispatch) => {
        dispatch({
            type:types.INIT_REMOVE_PRODUCT_CATEGORIES
        }) 
        await axios.put('admin/categories/'+id).then(response => {    
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