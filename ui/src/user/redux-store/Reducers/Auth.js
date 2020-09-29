import * as types from "../actionNames";

const initialStore = {
<<<<<<< HEAD
  userId: "",
  token: "",
  error: "",
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
    case types.LOGOUT:
      return {
        userId: "",
        token: "",
        error: "",
      };
    default:
      return state;
  }
=======
    userId: "",
    message: "",
    token: "",
    error: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case types.SIGNUP:
            return {
                ...state,
                userId: action.user,
                token: action.token,
                error: ""
            }
        case types.SIGNUP_FAILED:
            return {
                ...state,
                error: action.error
            }
        case types.FORGET_PASSWORD:
            return {
                ...state,
                message : action.message
            }
        case types.FORGET_PASSWORD_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
>>>>>>> 818c9a25cb4aa39bca99eaa4f8196d0d723b33ab
};

export default store;
