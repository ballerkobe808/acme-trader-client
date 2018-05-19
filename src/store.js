import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import allReducers from './reducers/index'

const initialState = {
  // default polling time to 5 minutes
  pollingTime: {milliseconds: 300000, doPolling: false},
};
const enhancers = [];
const middleware = [thunk];


// extra feedback in development mode - dont include this when we build prod
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// bootstrap the enhancers and middleware together
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// the main store for your application (app state and data)
// we are also connecting the store to our combined reducers here and
// middleware too
export default createStore(allReducers, initialState, composedEnhancers);
