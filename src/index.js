import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import {createStore} from 'redux';
import {Provider} from 'react-redux';
// import thunk from 'redux-thunk';


import 'bootstrap/dist/css/bootstrap.min.css';

// libs from our app
import store from './store';
import './index.css';
import App from './App';
// import allReducers from './reducers/index'



ReactDOM.render(
  // by wrapping the main app component in the provider component and linking the
  // store we created above, now all the components in this app will have
  // access to the redux store
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
