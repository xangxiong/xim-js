import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authenticationActions from '../actions/authentication';

class Logout extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			finished: false
		};
	}
	
	render() {
		let { finished } = this.state;
		const { logout } = this.props.actions;
		
		const LogoutAction = withRouter(({ history }) => {
			if (!finished) {
				logout(history).then(() => {
					finished = true;
					this.setState({ finished });
				}).catch((err) => console.error(err));
				
				return <div className="logout">
					Logging out...
				</div>;
			} else {
				return <Redirect to="/login" />;
			}
		});
		
		return (
			<LogoutAction />
		);
	}
}

Logout.propTypes = {
	actions: PropTypes.object.isRequired
};

const mapDispatch = (dispatch) => {
	return {
		actions: bindActionCreators(authenticationActions, dispatch)
	};
};

export default connect(null, mapDispatch)(Logout);