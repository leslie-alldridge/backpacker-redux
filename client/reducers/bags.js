export default function(state = [], action) {
  switch (action.type) {
    // BAGS

    case "BAG_ADD_REQUEST":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case "DELETE_BAGS":
      return state.filter(item => item.id !== action.id);
    case "UPDATE_BAG":
      const index3 = state.findIndex(item => item.id === action.id);
      if (index3 > -1) {
        return state.map(item => {
          if (item.id === action.id) {
            item.description = action.description;
            item.destination = action.destination;
            return item;
          }
          return item;
        });
      }
    //ITEMS
    case "ADD_ITEM":
      const index = state.findIndex(item => item.id === action.id);
      if (index > -1) {
        return state.map(item => {
          if (item.id === action.id) item.items.push(action.inventory);
          return item;
        });
      }
    case "CHECK_ITEM":
      const index2 = state.findIndex(item => item.id === action.id);
      if (index2 > -1) {
        return state.map(item => {
          if (item.id === action.id) {
            item.checked.push(action.inventory);
            item.items = item.items.filter(x => x !== action.inventory);
            return item;
          }
          return item;
        });
      }
    case "DEL_ITEM":
      const index4 = state.findIndex(item => item.id === action.id);
      if (index4 > -1) {
        return state.map(item => {
          if (item.id === action.id) {
            item.checked = item.checked.filter(x => x !== action.inventory);
            return item;
          }
          return item;
        });
      }
    default:
      return state;
  }
}
