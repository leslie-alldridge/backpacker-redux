export const addBagAction = (id, description, destination) => ({
  type: 'ADD_TO_BAGS',
  id,
  description,
  destination,
  items: [],
  checked: []
});

export const deleteBagAction = id => ({
  type: 'DELETE_BAGS',
  id
});

export const updateBagAction = (id, destination, description) => ({
  type: 'UPDATE_BAG',
  id,
  description,
  destination
});
