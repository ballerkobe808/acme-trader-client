

// Reducers - these are how you actually update the main application store
// Each reducer represents one piece of the main data store
// All reducers get all the actions. When an action that the reducer cares about comes in,
// then update that piece of the store appropriately

// This Reducer is the one that grabs all the other reducers, combines them into one, and
// then connects to your store
import {combineReducers} from 'redux';
// import UserReducer from './UserReducer';
// import ActiveUserReducer from './ActiveUserReducer';
import CoinListReducer from './CoinListReducer';
import PollReducer from './PollReducer';
import SettingsReducer from './SettingsReducer';


// this is where we are defining what our main app store looks like
// whenever you add another reducer, remember to add it here
// so that it gets connected to the store
const allReducers = combineReducers({
  coinList: CoinListReducer,
  pollingTime: PollReducer,
  settings: SettingsReducer,
  
  // users: UserReducer,
  // activeUser: ActiveUserReducer
});

export default allReducers;

