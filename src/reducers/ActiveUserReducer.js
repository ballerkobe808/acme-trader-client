// actions are sent to all reducers
// its the reducers job to filter thru the actions it gets and do things
// when its something it cares about

export default function (state=null, action) {

  switch(action.type) {
    case 'USER_SELECTED': 
      return action.payload;
      break;

  };


  // default return
  return state;
}