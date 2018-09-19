import request from "../utils/api";
import { saveUserToken } from "../utils/auth";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

export function receiveBag(bag, user) {
  return {
    type: "BAG_SUCCESS",
    isFetching: false,
    response: bag
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function fetchBag(user) {
  return function(dispatch) {
    dispatch(requestBag());
    request("get", "/bags")
      .then(res => {
        dispatch(receiveBag(res.body.bag, user));
      })
      .catch(err => dispatch(loginError(err.message)));
  };
}

function requestBag() {
  return {
    type: "BAG_REQUEST",
    isFetching: true,
    isAuthenticated: true
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return request("post", "/signin", creds)
      .then(response => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.body.message));
          return Promise.reject(response.body.message);
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.body.token);
          // Dispatch the success action
          dispatch(receiveLogin(userInfo));

          dispatch(fetchBag(userInfo.username));
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
}
