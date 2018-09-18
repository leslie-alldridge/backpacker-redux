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
  return {
    type: "BAG_DEL_REQ",
    isFetching: true,
    isAuthenticated: true,
    id
  };
}

function receiveDelBag(response) {
  return {
    type: "BAG_DEL_DONE",
    isFetching: false,
    isAuthenticated: true,
    response: response
  };
}

export function deleteBagDB(id) {
  return function(dispatch) {
    dispatch(deleteReqBag(id));
    request("post", "/bagsdel", { id: id }).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveDelBag(response.body.bag));
      }
    });
  };
}

//all func below this line are for updating a bag

function updateReqBag(id, destination, description) {
  return {
    type: "BAG_UPD_REQ",
    isFetching: true,
    isAuthenticated: true,
    id,
    destination,
    description
  };
}

function receiveUpdBag(response) {
  return {
    type: "BAG_UPD_DONE",
    isFetching: false,
    isAuthenticated: true,
    response: response
  };
}

export function updateBagDB(id, destination, description) {
  return function(dispatch) {
    dispatch(updateReqBag(id, destination, description));
    request("post", "/bagsupdate", {
      id: id,
      destination: destination,
      description: description
    }).then(response => {
      console.log(response);

      if (!response.ok) {
      } else {
        console.log("hit the else");

        dispatch(receiveUpdBag(response.body.bag));
      }
    });
  };
}
