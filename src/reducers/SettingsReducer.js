// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and update its piece of the store
// when its something it cares about

export default function(state = {}, action) {

  switch (action.type) {
    case 'TOGGLE_SETTINGS':
      return {
        ...state,
        showSettings: !state.showSettings
      }; 
    
    default:
  };

  return state;
}