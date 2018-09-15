export const addBagAction = (id, description, destination) => {
  console.log(id, description, destination);
  
    return {
      type: 'ADD_TO_BAGS',
      id: id,
      description: description,
      destination: destination,
      items: []
    }
  }

  export const deleteBagAction = (id) => {
    console.log(id);
    
      return {
        type: 'DELETE_BAGS',
        id: id
      }
    }