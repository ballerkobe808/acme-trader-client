import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';

// this will be so we can use react-router and navigate around the single page app
// export const history = createHistory();


import allReducers from './reducers/index'

const initialState = {};
const enhancers = [];
// using thunk for callback/promises and hooking up the react-router history middleware
// const middleware = [thunk, routerMiddleware(history)];
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
