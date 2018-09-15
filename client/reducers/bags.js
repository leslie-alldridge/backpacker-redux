export default function(state = [], action) {
  
	switch (action.type) {
        case "ADD_TO_BAGS":
                return [...state, action]    
        case "DELETE_BAGS":
                return state.filter(item => item.id !== action.id)          
        case "ADD_ITEM":
                const index = state.findIndex(item => item.id === action.id)
                if (index > -1) {
                        return state.map(item => {
                                if (item.id === action.id) item.items.push(action.inventory)
                                return item;
                        })
                }
        case "CHECK_ITEM":
                const index2 = state.findIndex(item => item.id === action.id)
                if (index2 > -1) {
                        return state.map(item => {
                                if (item.id === action.id) {
                                        item.checked.push(action.inventory)
                                        item.items = item.items.filter(x => x !== action.inventory)
                                        return item
                                }
                                return item;
                        })
                }
        }   
        return state  
        }