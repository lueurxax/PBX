import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';

class App extends Component {
  render() {
    return (
        <div>
          <Header authenticated = {this.props.authenticated}/>
            {this.props.children}
        </div>
    );
  }
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
