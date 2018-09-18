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
        errorMessage: action.message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
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

    //in this request they are authenticated already and we're fetching bags
    case "BAG_REQUEST": {
      console.log("hit bag request");
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }
    //update cases
    case "BAG_UPD_REQ": {
      console.log("hit update request");
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }

    case "BAG_UPD_DONE": {
      console.log("hit done update request");
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bag: action.response
      };
    }

    case "ITEM_ADD_REQ": {
      console.log("hit add item request");
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    }

    case "ITEM_ADD_DONE": {
      console.log("hit done bag item");
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    case "ITEM_SHOW_DONE": {
      console.log("hit show bag item");
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        bagItems: action.response
      };
    }

    case "ITEM_ARC_REQ":
      console.log("hit arc item request");
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case "ITEM_ARC_DONE": {
      console.log("hit done arc bag item");
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
