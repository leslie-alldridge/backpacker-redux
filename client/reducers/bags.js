export default function(state = [], action) {
  
	switch (action.type) {
        case "ADD_TO_BAGS":
               
                    return [...state, action]
                   
            }
            console.log(state);
            
            return state  
        }