import * as types from '../actionNames'
import axiosInstance from '../../../axios';

export const fetchProductCategories = () => {
    return async dispatch => {
      
        await axiosInstance.get('client/category').then(response => {
            dispatch({
                type: types.FETCH_PRODUCT_CATEGORIES_SUCCESS,
                product_categories: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error: error.message
            });
        })
    };
};

export const fetchSubCategories = () => {
    return async dispatch => {
      
        await axiosInstance.get('client/subcategory').then(response => {
            dispatch({
                type: types.SUB_CATEGORY,
                subCategories: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error: error.message
            });
        })
    };
};

export const fetchMenuSubCat = (id) => {
    return async dispatch => {
      
        await axiosInstance.get('client/categoryMenu/'+id).then(response => {
            dispatch({
                type: types.MENU_SUB_CAT,
                menuSubCat: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.FETCH_PRODUCT_CATEGORIES_FAILED,
                error: error.message
            });
        })
    };
};

export const categoryWiseProduct=(cid)=>
{
    return async dispatch => {
      
        await axiosInstance.get('client/category-product/'+cid).then(response => {
            dispatch({
                type: types.CATEGORY_PRODUCT,
                products: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.CATEGORY_PRODUCT_FAILED,
                error: error.message
            });
        })
    };
}