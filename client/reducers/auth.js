import {LOGOUT_SUCCESS} from '../actions/logout'
import {REGISTER_REQUEST, REGISTER_FAILURE} from '../actions/register'
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/login'
import {isAuthenticated, getUserTokenInfo} from '../utils/auth'

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  user: getUserTokenInfo(),
  errorMessage: '',
  bags: [],
  bag: []
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: null
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
     case 'BAG_SUCCESS':
     console.log('my get bags switch statement');
     console.log(action.response);
     
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        // quote: action.response,
        errorMessage: '',
        bag: action.response
      }

    //  return {
    //   ...state,
    //   isFetching: false,
    //   isAuthenticated: true,
    //   errorMessage: action.message,
    //   user: action.user,
    //   bags: action.bags
    // }
    //in this request they are authenticated already and we're fetching bags
    case 'BAG_REQUEST': {
      console.log('hit bag request');
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
      }
    }
    default:
      return state
  }
}