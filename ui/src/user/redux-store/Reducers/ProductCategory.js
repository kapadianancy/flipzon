import { bindActionCreators } from "redux";
import * as types from "../actionNames";

const initialStore = {
  product_categories: [],
  subCategories: [],
  menusubCat: [],
  error: "",
};

const store = (state = initialStore, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        product_categories: action.product_categories,
      };
    case types.FETCH_PRODUCT_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.error,
      };

    case types.SUB_CATEGORY:
      return {
        ...state,
        subCategories: action.subCategories,
      };
    case types.MENU_SUB_CAT:
      return {
        ...state,
        menuSubCat:action.menuSubCat
      };
    default:
      return state;
  }
};

export default store;
