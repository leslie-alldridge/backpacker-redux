export default function(state = [], action) {
  
	switch (action.type) {
        case "ADD_TO_BAGS":
                return [...state, action]    
        case "DELETE_BAGS":
                return state.filter(item => item.id !== action.id)          
        } 
            
        return state  
        }