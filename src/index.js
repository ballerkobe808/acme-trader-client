import React from 'react';
import ReactDOM from 'react-dom';
// import { unregister } from './registerServiceWorker';
// import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

// using bootstrap 4 (along with reactstrap)
import 'bootstrap/dist/css/bootstrap.min.css';

// libs from our app
import store from './store';
import './index.css';
import App from './App';


ReactDOM.render(
  // by wrapping the main app component in the provider component and linking the
  // store we created above, now all the components in this app will have
  // access to the redux store
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));


// registerServiceWorker();
// unregister();
// unregister();