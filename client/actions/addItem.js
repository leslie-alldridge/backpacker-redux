export const saveItemAction = (id, item) => ({
  type: 'ADD_ITEM',
  id,
  inventory: item,
  quantity: 1
});

export const checkItAction = (id, item) => ({
  type: 'CHECK_ITEM',
  id,
  inventory: item
});

export const deleteItAction = (id, item) => ({
  type: 'DEL_ITEM',
  id,
  inventory: item
});
