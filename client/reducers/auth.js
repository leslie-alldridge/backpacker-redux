import { LOGOUT_SUCCESS } from "../actions/logout";
import { REGISTER_REQUEST, REGISTER_FAILURE } from "../actions/register";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/login";
import { isAuthenticated, getUserTokenInfo } from "../utils/auth";

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  user: getUserTokenInfo(),
  errorMessage: "",
  bags: [],
  bag: [],
  bagItems: []
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: "Invalid Credentials"
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        isFetching: false,
        isAuthenticated: false,
        user: null
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case "BAG_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        bag: action.response
      };

    case "BAG_DEL_REQ":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case "BAG_DEL_DONE":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        bag: action.response
      };

    case "BAG_REQUEST": {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }

    case "BAG_UPD_REQ": {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }

    case "BAG_UPD_DONE": {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bag: action.response
      };
    }

    case "ITEM_ADD_REQ": {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }

    case "ITEM_ADD_DONE": {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    case "ITEM_SHOW_DONE": {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    case "ITEM_ARC_REQ":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case "ITEM_ARC_DONE": {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    case "ITEM_DEL_REQ":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case "ITEM_DEL_DONE": {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    default:
      return state;
  }
}
