import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../actions/authentication';

class Login extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				Login Form
			</div>
		);
	}
}

const { object } = PropTypes;

Login.propTypes = {
	actions: object.isRequired
};

const mapDispatch = (dispatch) => {
	return {
		actions: bindActionCreators(authenticationActions, dispatch)
	};
};

export default connect(null, mapDispatch)(Login);