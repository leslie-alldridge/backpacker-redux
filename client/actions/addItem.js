export const saveItemAction = (id, item) => {
    console.log(id, item);
    
      return {
        type: 'ADD_ITEM',
        id: id,
        inventory: item,
        quantity: 1
      }
    }
    
    export const checkItAction = (id, item) => {
        console.log(id, item);
        
          return {
            type: 'CHECK_ITEM',
            id: id,
            inventory: item
          }
        }