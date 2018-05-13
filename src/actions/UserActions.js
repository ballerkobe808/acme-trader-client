// Actions are a way of telling the app that "something happened"
// setup your action(s) here, these will be sent to one or more reducers

// this function is the action creator
// its job is to return an object which is called the "action"
export const selectUser = (user) => {
  console.log('click', user)


  
  // this is the "action"
  // type and payload are always required - type has to be named "type", but
  // payload can be named something else
  return {
    type: "USER_SELECTED",
    payload: user
  }
}