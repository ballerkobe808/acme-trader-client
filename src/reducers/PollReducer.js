// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and update its piece of the store
// when its something it cares about

export default function(state = {}, action) {

  switch (action.type) {
    case 'START_NEW_POLL':
      return {
        ...state,
        milliseconds: action.payload,
        doPolling: true
      }; 

    case 'STOP_POLLING':
      return {
        ...state,
        doPolling: false
      }; 
    
    default:
  };

  return state;
  

}