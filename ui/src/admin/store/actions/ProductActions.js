import * as types from '../Types'
import axios from '../../axios'

export const fetchProducts = () => {
    return async(dispatch) => {
        dispatch({ type: types.INIT_FETCH_PRODUCTS });
        try {
            const products = await axios.get("products");
            console.log(products);
        } catch(error) {
            console.log(error);
        }
        dispatch({ type: types.FETCH_PRODUCTS_SUCCESS, products: [] });
        dispatch({ type: types.FETCH_PRODUCTS_FAILED });
    }
}