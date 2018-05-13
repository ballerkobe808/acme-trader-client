import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {selectUser} from '../actions/UserActions';


class UserList extends Component {

  render() {
    return (
      <div>
        hello
      <ul>
        
       {this.createListItems()}
      </ul>
      </div>
    );
  }

  createListItems() {
    // console.log(this.props)
    return this.props.users.map((user) => {
      return (
        <li 
        key={user.id}
        // connecting an event to an action 
        onClick={() => this.props.selectUser(user)}
        >
        {user.first} {user.last}
        </li>
      );
    }); 
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
    users: state.users
  }
}


// in order for actions to be hooked up correctly in redux, you need to pass the actions here
// vs trying import it and use it directly in the component
function matchDispatchToProps(dispatch) {
  return bindActionCreators( {
    // hook up the functions you want to pass in to the component here
    selectUser: selectUser
  }, dispatch)
}

// this will connect the component u just created and connect it to the mapStateToProps function
// then export this new smart and connected component
export default connect(mapStateToProps, matchDispatchToProps)(UserList);