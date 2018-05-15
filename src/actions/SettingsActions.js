
// Actions are a way of telling the app that "something happened"
// setup your action(s) here, these will be sent to one or more reducers
// put most of your business logic here, since you have access to the full store
// vs reducers where you only have access to a limited part of the store

// this function is the action creator
// its job is to return an object which will then dispatch "actions"
export function toggleSettings() {

  return function(dispatch) {
    dispatch({ type: "TOGGLE_SETTINGS"});
  }
}