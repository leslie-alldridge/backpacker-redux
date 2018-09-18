import request from "../utils/api";

export const updateBagAction = (id, destination, description) => ({
  type: "UPDATE_BAG",
  id,
  description,
  destination
});

//all func below this line are for adding bags

export function addBagReceived(bag, user) {
  return {
    type: "BAG_ADD_SUCCESS",
    isFetching: false,
    response: bag
  };
}

function requestAddBag() {
  return {
    type: "BAG_ADD_REQUEST",
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveAddBag(user, bag) {
  return {
    type: "BAG_SUCCESS",
    isFetching: false,
    response: bag
  };
}

export function saveBagToDB(user, description, destination) {
  let req = {
    description,
    destination
  };

  return function(dispatch) {
    dispatch(requestAddBag());
    request("post", "/bags", req).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveAddBag(user, response.body.bag));
      }
    });
  };
}

//all func below this line are for deleting a bag

function deleteReqBag(id) {
  console.log("hit delete bag request");
  return {
    type: "BAG_DEL_REQ",
    isFetching: true,
    isAuthenticated: true,
    id
  };
}

function receiveDelBag(response) {
  console.log("hit delete done request");
  console.log(response);

  return {
    type: "BAG_DEL_DONE",
    isFetching: false,
    isAuthenticated: true,
    response: response
  };
}

export function deleteBagDB(id) {
  console.log("made it to action");

  return function(dispatch) {
    dispatch(deleteReqBag(id));
    console.log(id);

    request("post", "/bagsdel", { id: id }).then(response => {
      if (!response.ok) {
        console.log("broken");
      } else {
        //console.log(response);
        dispatch(receiveDelBag(response.body.bag));
      }
    });
  };
}
