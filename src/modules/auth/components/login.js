import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Header, Image, Icon, Input, Button, Message } from 'semantic-ui-react';
import * as authenticationActions from '../actions/authentication';
import logo from '../../../images/logo.png';

class Login extends React.Component {
	render() {
		return (
			<div className="login">
				<Grid centered>
					<Grid.Column textAlign="center">
						<Header color="grey">
							<Image src={logo} />
							Login using your credentials!
						</Header>
						<form className="ui large form">
							<div className="ui raised segment">
								<div className="field">
									<div className="ui left icon input">
										<Input type="text" id="username" name="username" icon="user" placeholder="Username" />
									</div>
								</div>
								<div className="field">
									<div className="ui left icon input">
										<Input type="password" id="password" name="password" icon="lock" placeholder="Password" />
									</div>
								</div>
								<Button fluid size="large" color="blue">Login!</Button>
							</div>
							<Message error></Message>
						</form>
					</Grid.Column>
				</Grid>
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