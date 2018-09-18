import request from "../utils/api";

export const updateBagAction = (id, destination, description) => ({
  type: "UPDATE_BAG",
  id,
  description,
  destination
});

//all func below this line are for adding bags

export function addBagReceived(bag, user) {
  console.log(bag);

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
  console.log(bag);
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

//all func below this line are for bag items

//show bag items

export function showItems(id) {
  return function(dispatch) {
    console.log(id);

    request("get", "/itemshow", {
      bagid: id
    }).then(response => {
      console.log(response);

      if (!response.ok) {
      } else {
        console.log("hit the else for show item");
        dispatch(showItem(response.body.bagItems));
      }
    });
  };
}

export function saveItemAction(id, input) {
  console.log(id, input);
  console.log("actions");

  return function(dispatch) {
    dispatch(addReqItem(id, input));
    request("post", "/itemadd", {
      id: id,
      input: input
    }).then(response => {
      console.log(response);

      if (!response.ok) {
      } else {
        console.log("hit the else for add item");
        console.log(response);
        console.log(response.body.bagItems);

        dispatch(receieveItem(response.body.bagItems));
      }
    });
  };
}

function addReqItem(id, input) {
  return {
    type: "ITEM_ADD_REQ",
    isFetching: true,
    isAuthenticated: true,
    id,
    input
  };
}

function receieveItem(response) {
  return {
    type: "ITEM_ADD_DONE",
    isFetching: false,
    isAuthenticated: true,
    response: response
  };
}

function showItem(response) {
  return {
    type: "ITEM_SHOW_DONE",
    isFetching: false,
    isAuthenticated: true,
    response: response
  };
}

//archive an item

export function checkItAction(id, item) {
  console.log(id, item);
  console.log("actions");

  return function(dispatch) {
    dispatch(arcReqItem(id, item));
    request("post", "/itemarchive", {
      id: id,
      item: item
    }).then(response => {
      console.log(response);

      if (!response.ok) {
      } else {
        console.log("hit the else for add item");
        //console.log(response);
        console.log(response.body.bagItems);

        dispatch(arcDoneItem(response.body.bagItems));
      }
    });
  };
}

function arcReqItem(id, item) {
  return {
    type: "ITEM_ARC_REQ",
    isFetching: true,
    isAuthenticated: true,
    id,
    item
  };
}

function arcDoneItem(response) {
  return {
    type: "ITEM_ARC_DONE",
    isFetching: true,
    isAuthenticated: true,
    response
  };
}
