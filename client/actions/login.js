import request from '../utils/api'
import {saveUserToken} from '../utils/auth'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin () {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin (user) {
  // request('get', '/bags')
  //     .then(res => {
  //       console.log('res came back from api');
  //       console.log(res);
  //     })
  //     .catch(err => dispatch(quoteError(err.response.body.message)))
  
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

//this function never gets hit 
export function receiveBag (bag, user) {
  console.log(bag);
  console.log(user);
  return {
    type: 'BAG_SUCCESS',
    isFetching: false,
    response: bag
  }
}

function loginError (message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function fetchBag(user){
  console.log(user + ' this is my action GET BAGS');
  return function (dispatch) {
    dispatch(requestBag())
    request('get', '/bags')
      .then(res => {
        console.log(res.body.bag);
        
        dispatch(receiveBag(res.body.bag, user))
      })
      .catch(err)
  }
}  
  
function requestBag(){
  return {
    type: 'BAG_REQUEST',
    isFetching: true,
    isAuthenticated: true,
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser (creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return request('post', '/signin', creds)
      .then((response) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.body.message))
          return Promise.reject(response.body.message)
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.body.token)
          // Dispatch the success action
          dispatch(receiveLogin(userInfo))
          console.log(userInfo);
          dispatch(fetchBag(userInfo.username))
          
        }
      }).catch(err => dispatch(loginError(err.response.body.message)))
  }
}