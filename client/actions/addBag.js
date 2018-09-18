import request from "../utils/api";
import { saveUserToken } from "../utils/auth";

export const deleteBagAction = id => ({
  type: "DELETE_BAGS",
  id
});

export const updateBagAction = (id, destination, description) => ({
  type: "UPDATE_BAG",
  id,
  description,
  destination
});

//all func below this line are for adding bags

export function addBagReceived(bag, user) {
  console.log(bag);
  console.log(user);
  return {
    type: "BAG_ADD_SUCCESS",
    isFetching: false,
    response: bag
  };
}

function requestAddBag() {
  console.log("here now");

  return {
    type: "BAG_ADD_REQUEST",
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveAddBag(user, bag) {
  console.log(bag);
  console.log(user);
  return {
    type: "BAG_SUCCESS",
    isFetching: false,
    response: bag
  };
}

export function saveBagToDB(user, description, destination) {
  console.log("made it ");
  let req = {
    description,
    destination
  };
  console.log(req);
  // console.log(description);
  // console.log(destination);

  return function(dispatch) {
    dispatch(requestAddBag());

    request("post", "/bags", req)
      .then(response => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          //dispatch(loginError(response.body.message));
          //return Promise.reject(response.body.message);
        } else {
          // If login was successful, set the token in local storage
          //const userInfo = saveUserToken(response.body.token);
          // Dispatch the success action
          dispatch(receiveAddBag(user, response));
          console.log("response sent");
          // dispatch(fetchBag(userInfo.username));
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
}
