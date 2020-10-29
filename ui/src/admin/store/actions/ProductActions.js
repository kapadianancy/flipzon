import * as types from '../Types'
import axios from '../../../axios'

export const fetchProducts = (page, limit) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_FETCH_PRODUCTS });
        try {
            let token = getState().adminAuth.token
            let query = `?page=${page}&limit=${limit}`
            const data = await axios.get("admin/products"+query, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.FETCH_PRODUCTS_SUCCESS, products: data.data.products, total: data.data.total });
        } catch(error) {
            dispatch({ type: types.FETCH_PRODUCTS_FAILED, error: error.message });
        }
    }
}

export const searchProducts = (text) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_FETCH_PRODUCTS });
        try {
            const data = await axios.get(`admin/products/search?text=${text}`);
            dispatch({ type: types.FETCH_PRODUCTS_SUCCESS, products: data.data });
        } catch(error) {
            dispatch({ type: types.FETCH_PRODUCTS_FAILED, error: error.message });
        }
    }
}

export const addProduct = (productData) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_ADD_PRODUCT });
        try {
            let token = getState().adminAuth.token;
            const result = await axios.post("admin/products", productData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Authorization': token
                }
            });
            dispatch({ type: types.ADD_PRODUCT_SUCCESS, product: result.data });
        } catch (error) {
            if(error.response.data.message.errors) {
                dispatch({ type: types.ADD_PRODUCT_FAILED, error: error.response.data.message.errors });
            } else {
                dispatch({ type: types.ADD_PRODUCT_FAILED, error: error.message });
            }
            throw new Error()
        }
    }
}

export const fetchOneProduct = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_FETCH_ONE_PRODUCT });
        try {
            let token = getState().adminAuth.token;
            const data = await axios.get(`admin/products/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch({ type: types.FETCH_ONE_PRODUCT_SUCCESS, product: data.data });
        } catch(error) {
            dispatch({ type: types.FETCH_ONE_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const editProduct = (id, productData) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_EDIT_PRODUCT });
        try {
            let token = getState().adminAuth.token;
            const result = await axios.put(`admin/products/${id}`, productData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Authorization': token
                }
            });
            dispatch({ type: types.EDIT_PRODUCT_SUCCESS, product: result.data });
        } catch (error) {
            dispatch({ type: types.EDIT_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const deleteProduct = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_DELETE_PRODUCT });
        try {
            let token = getState().adminAuth.token;
            await axios.delete(`admin/products/${id}`, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.DELETE_PRODUCT_SUCCESS, product_id: id });
        } catch(error) {
            dispatch({ type: types.DELETE_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const deleteProductImage = (ids) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.INIT_DELETE_PRODUCT_IMAGE });
        try {
            let token = getState().adminAuth.token;
            await axios.post(`admin/products/images`,{
                    ids: [...ids]
                }, {
                headers: {
                    "Authorization": token,
                }
            });
            dispatch({ type: types.DELETE_PRODUCT_IMAGE_SUCCESS, image_ids: ids });
        } catch(error) {
            dispatch({ type: types.DELETE_PRODUCT_IMAGE_FAILED, error: error.message });
        }
    }
}

export const editProductOffer = (id,discount,offer) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_EDIT_OFFER });
        try {
            // let token = getState().adminAuth.token;
            const result = await axios.put(`admin/productOffer/${id}/${discount}/${offer}`);
            dispatch({ type: types.EDIT_OFFER_SUCCESS, product: result.data });
        } catch (error) {
            dispatch({ type: types.EDIT_OFFER_FAILED, error: error.message });
        }
    }
}

export const fetchOOSProducts = () => {
    return async (dispatch, getState) => {
        dispatch({ type: types.INIT_FETCH_OOS_PRODUCTS });
        try {
            let token = getState().adminAuth.token;
            const response = await axios.get(`/admin/outOfStock`, {
                headers: {
                    "Authorization": token
                }
            });
            dispatch({ type: types.FETCH_OOS_PRODUCTS_SUCCESS, data: response.data });
        } catch (error) {
            dispatch({ type: types.FETCH_OOS_PRODUCTS_FAILED, error: error.message });
        }
    }
}

export const removeOOSProduct = (id) => {
    return { type: types.REMOVE_OOS_PRODUCT, id };
}