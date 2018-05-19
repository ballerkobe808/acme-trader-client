

// Reducers - these are how you actually update the main application store
// Each reducer represents one piece of the main data store
// All reducers get all the actions. When an action that the reducer cares about comes in,
// then update that piece of the store appropriately
import {combineReducers} from 'redux';
import CoinListReducer from './CoinListReducer';
import PollReducer from './PollReducer';


// This Reducer is the one that grabs all the other reducers, combines them into one, and
// then connects to your store
const allReducers = combineReducers({
  // this is where we are defining what our main app store looks like
  // whenever you add another reducer, remember to add it here
  // so that it gets connected to the store
  coinList: CoinListReducer,
  pollingTime: PollReducer,
});

export default allReducers;

