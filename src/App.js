import React, { Component } from 'react';

// main components to use in the app/page
import CoinDashboard from './containers/CoinDashboard'
import AcmeNavbar from './containers/AcmeNavbar'
import Footer from './components/Footer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <AcmeNavbar />

        <div className="container-fluid pt-4">
          <CoinDashboard />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
