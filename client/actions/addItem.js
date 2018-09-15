export const saveItemAction = (id, item) => {
    console.log(id, item);
    
      return {
        type: 'ADD_ITEM',
        id: id,
        inventory: item
      }
    }