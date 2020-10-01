import * as types from "../actionNames";

const initialStore = {
  userId: "",
  token: "",
  error: "",
  user: {},
  message: "",
  orders : []
};

const store = (state = initialStore, action) => {
  switch (action.type) {
    case types.SIGNUP:
      return {
        ...state,
        userId: action.user,
        token: action.token,
        error: "",
      };
    case types.SIGNUP_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case types.LOGIN:
      return {
        ...state,
        error: "",
        userId: action.user,
        token: action.token,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case types.FORGET_PASSWORD:
      return {
        ...state,
        message: action.message,
        error: ""
      };
    case types.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        error: action.error,
        message: ""
      };
    case types.LOGOUT:
      return {
        userId: "",
        token: "",
        error: "",
      };
    case types.GET_SINGLE_USER:
      return {
        user: action.user,
        error: ""
      };
    case types.GET_SINGLE_USER_FAILED:
      return {
        error: action.error
      }
    case types.EDIT_PROFILE:
      return {
        ...state,
        message: action.message,
        error: ""
      }
    case types.EDIT_PROFILE:
      return {
        ...state,
        error: action.error,
        message: ""
      }
    case types.CHANGE_PASSWORD: {
      return {
        ...state,
        message: action.message,
        error: ""
      }
    }
    case types.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        error: action.error,
        message: ""
      }
    }
    case types.VIEW_ORDER : {
      return{
        ...state,
        orders: action.orders
      }
    }
    case types.VIEW_ORDER_FAILED : {
      return{
        ...state,
        error: action.error
      }
    }

    default:
      return state;
  }
};

export default store;
