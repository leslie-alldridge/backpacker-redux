export const addBagAction = (description, destination) => {
  console.log(description, destination);
  
    return {
      type: 'ADD_TO_BAGS',
      description: description,
      destination: destination
    }
  }