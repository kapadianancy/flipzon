import * as types from '../Types'
import axios from '../../../axios'

export const fetchProducts = () => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_FETCH_PRODUCTS });
        try {
            const data = await axios.get("admin/products");
            dispatch({ type: types.FETCH_PRODUCTS_SUCCESS, products: data.data });
        } catch(error) {
            dispatch({ type: types.FETCH_PRODUCTS_FAILED, error: error.message });
        }
    }
}

export const addProduct = (productData) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_ADD_PRODUCT });
        try {
            const result = await axios.post("admin/products", productData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            dispatch({ type: types.ADD_PRODUCT_SUCCESS, product: result.data });
        } catch (error) {
            dispatch({ type: types.ADD_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const fetchOneProduct = (id) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_FETCH_ONE_PRODUCT });
        try {
            const data = await axios.get(`admin/products/${id}`);
            dispatch({ type: types.FETCH_ONE_PRODUCT_SUCCESS, product: data.data });
        } catch(error) {
            dispatch({ type: types.FETCH_ONE_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const editProduct = (id, productData) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_EDIT_PRODUCT });
        try {
            const result = await axios.put(`products/${id}`, productData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            dispatch({ type: types.EDIT_PRODUCT_SUCCESS, product: result.data });
        } catch (error) {
            dispatch({ type: types.EDIT_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const deleteProduct = (id) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_DELETE_PRODUCT });
        try {
            const data = await axios.delete(`products/${id}`);
            dispatch({ type: types.DELETE_PRODUCT_SUCCESS, product_id: id });
        } catch(error) {
            dispatch({ type: types.DELETE_PRODUCT_FAILED, error: error.message });
        }
    }
}

export const deleteProductImage = (id) => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_DELETE_PRODUCT_IMAGE });
        try {
            const data = await axios.delete(`products/images/${id}`);
            dispatch({ type: types.DELETE_PRODUCT_IMAGE_SUCCESS, image_id: id });
        } catch(error) {
            dispatch({ type: types.DELETE_PRODUCT_IMAGE_FAILED, error: error.message });
        }
    }
}