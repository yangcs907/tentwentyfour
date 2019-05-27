// Component for when user first visits site / logged out

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class About extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
  };
  render() {
    return (
      <div>
      </div>
    )
  }
};


About.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(About);
