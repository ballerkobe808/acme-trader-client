import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import { setPoll, stopPoll } from '../actions/PollActions';

class AcmeNavBar extends React.Component {
  constructor(props) {
    super(props);

    // bind functions to this here so they get called in the right context
    this.setPollCheckbox = this.setPollCheckbox.bind(this);
    this.setPollInterval = this.setPollInterval.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      pollFlag: false,
      secondInterval: 30 
    };
  }

  // mobile toggle
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // called if the user changes the second intervals
  setPollInterval(event) {
    this.setState({
      secondInterval: event.target.value
    }, function() {
      this.checkSetPoll();
    });
  }

  // called if the user toggles the polling control
  setPollCheckbox(event) {
    this.setState({
      pollFlag: event.target.checked
    }, function() {
      this.checkSetPoll();
    });
  }

  // decide whether to send out a polling action depending on what values were set
  checkSetPoll() {
    // set the polling to on, if the user selected to poll and if the value is greater than 3 (too low will mess this up)
    // later add validation to the front for min poll number
    if (this.state.pollFlag && this.state.secondInterval != '' && parseFloat(this.state.secondInterval) > 3 ) {
      this.props.setPoll(this.state.secondInterval * 1000);
    }
    else {
      this.props.stopPoll();
    }
  }


  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Acme FinTech</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Kraken Bitcoin Exchange
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Kraken Bitcoin Exchange
                  </DropdownItem>
                  <DropdownItem disabled>
                    Coinbase (Coming Soon)
                  </DropdownItem>
                  <DropdownItem disabled>
                    Bitfinex (Coming Soon)
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Settings
                  </DropdownToggle>
                  <DropdownMenu right>
                    <div style= {{padding: '10px', width: '370px'}}>
                      <div style= {{display: 'inline-block', width: '70px'}}>
                        <label className="switch">
                          <input type="checkbox" onChange={this.setPollCheckbox} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div style= {{display: 'inline-block', width: '260px', verticalAlign: 'top', paddingTop: '2px'}}>
                        Poll Data every
                        <input defaultValue="30" onBlur={this.setPollInterval} className='form-control' type="number" style= {{width: '60px', display: 'inline', padding: '3px', textAlign: 'right', marginLeft: '3px'}} /> Seconds
                      </div>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}



// this takes a piece of your application state and passes it in to your component
// as a property. It can pass whatever piece of the store that you want and "map"
// it to a property on your component. How easy is this.

// the reason for this, is that we dont wanna pass in ALL the data in the store to
// every component/container. So by using this we can pick and choose what this 
// component actually gets
function mapStateToProps(state) {
  return {
    pollingTime: state.pollingTime
  }
}

// in order for actions to be hooked up correctly in redux, you need to pass the actions here
// vs trying import it and use it directly in the component
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setPoll: setPoll,
    stopPoll: stopPoll
  }, dispatch)
}

// this will connect the component u just created and connect it to the mapStateToProps function
// then export this new smart and connected component
export default connect(mapStateToProps, matchDispatchToProps)(AcmeNavBar);
