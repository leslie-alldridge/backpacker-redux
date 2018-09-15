export default function(state = [], action) {
  /*eslint-disable */
  switch (action.type) {
    case "ADD_TO_BAGS":
      const index1 = state.findIndex(
        item =>
          item.description === action.description &&
          item.destination === action.destination
      );
      if (index1 > -1) {
        return state.map(item => {
          if (
            item.description === action.description &&
            item.destination === action.destination
          ) {
          }
          return item;
        });
      } else {
        return [...state, action];
      }
    case "DELETE_BAGS":
      return state.filter(item => item.id !== action.id);
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
    default:
      return state;
  }
}
