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

export const categoryWiseProduct = (cid) => {
    return async dispatch => {

        await axiosInstance.get('client/category-product/' + cid).then(response => {
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

export const getSpecificationByProduct = (pid) => {
    return async dispatch => {

        await axiosInstance.get('client/getSpecificationByProductId/'+pid).then(response => {
            dispatch({
                type: types.DISPLAY_PRODUCT_SPECIFICATION,
                specification: response.data.product
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
}

export const offerWiseProduct = () => {
    return async dispatch => {

        await axiosInstance.get('client/offer-product/').then(response => {
            dispatch({
                type: types.DISPLAY_OFFER_PRODUCT,
                offer_products: response.data
            });
        }).catch(error => {
            dispatch({
                type: types.DISPLAY_OFFER_PRODUCT_FAILED,
                error: error.message
            });
        })
    };
}

export const orderedProducts = () => {
    return async dispatch => {
        await axiosInstance.get("/client/orderedProducts").then(response => {
            dispatch({
                type: types.ORDERED_PRODUCT,
                products: response.data
            })
        }).catch(error => {
            dispatch({
                type: types.ORDERED_PRODUCT_FAILED,
                error: error.message
            });
        })
    }
}

export const productDetails = (pid) => {
   
    return async dispatch => {

        await axiosInstance.get('client/getProductById/' + pid).then(response => {
            dispatch({
                type: types.DISPLAY_SINGLE_PRODUCT,
                products: response.data.product,
                images:response.data.images
            });
        }).catch(error => {
            dispatch({
                type: types.DISPLAY_SINGLE_PRODUCT_FAILED,
                error: error.message
            });
        })
    };
}

export const searchProduct = (text) => {
    return async dispatch => {

        await axiosInstance.get('client/searchProduct/' + text).then(response => {
            dispatch({
                type: types.SEARCH_PRODUCT,
                products: response.data
            });
        }).catch(error => {
            
        })
    };
}

export const addReview = (review) => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        
        await axiosInstance.post('/client/addReview', review,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: types.ADD_REVIEW,
                message:response.data
            });
        }).catch(error => {
            dispatch({
                error: error.message
            });
        })
    };
};

export const getReviews = (pid) => {
    return async dispatch => {
        await axiosInstance.get("/client/reviews/"+pid).then(response => {
            console.log(response.data);
            dispatch({
                type: types.GET_REVIEWS,
                review:response.data
            });
        }).catch(error => {
           console.log(error);
        })
    };
};