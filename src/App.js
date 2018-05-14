import React, { Component } from 'react';


// components to use in the app/page
import AgGrid from './containers/AgGrid'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import UserList from './containers/UserList'
// import UserDetail from './containers/UserDetail'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <div className="container-fluid pt-4">
          <AgGrid />
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default App;
