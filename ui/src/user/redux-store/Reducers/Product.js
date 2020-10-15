import * as types from "../actionNames";

const initialStore = {
  products: [],
  images: [],
  error: "",
  review: [],
};

const store = (state = initialStore, action) => {
  switch (action.type) {
    case types.CATEGORY_PRODUCT:
      return {
        ...state,
        products: action.products,
      };
    case types.CATEGORY_PRODUCT_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case types.DISPLAY_OFFER_PRODUCT:
      return {
        ...state,
        products: action.products,
      };
    case types.DISPLAY_OFFER_PRODUCT_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case types.ORDERED_PRODUCT:
      return {
        ...state,
        products: action.products,
      };
    case types.DISPLAY_SINGLE_PRODUCT:
      return {
        ...state,
        products: action.products,
        images: action.images,
      };
    case types.DISPLAY_SINGLE_PRODUCT_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case types.SEARCH_PRODUCT:
      return {
        ...state,
        products: action.products,
      };
    case types.ADD_REVIEW:
      return {
        ...state,
       // review: action.review,
      };
    case types.GET_REVIEWS:
      return{
          ...state,
          review:action.review
      }
    default:
      return state;
  }
};

export default store;
