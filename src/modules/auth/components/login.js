import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Image, Icon, Input, Button, Message, Form } from 'semantic-ui-react';
import * as authenticationActions from '../actions/authentication';
//import logo from '../../../images/logo.png';

class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(history, e) {
		const data = new FormData(e.target);
		const { login } = this.props.actions;
		
		e.preventDefault();
		
		let user = {};
		for (let entry of data.entries()) {
			user[entry[0]] = entry[1];
		}
		
		login(user, history);
	}
	
	render() {
		const LoginForm = withRouter(({ history }) => (
			<Form size="large" method="post" onSubmit={(e) => this.onSubmit(history, e)}>
				<div className="ui raised segment">
					<div className="field">
						<div className="ui left icon input">
							<Input type="text" name="username" icon="user" placeholder="Username" />
						</div>
					</div>
					<div className="field">
						<div className="ui left icon input">
							<Input type="password" name="password" icon="lock" placeholder="Password" />
						</div>
					</div>
					<Button fluid size="large" color="blue" type="submit">Login!</Button>
				</div>
				<Message error />
			</Form>
		));
		// <Image src={logo} />
		return (
			<div className="login">
				<Grid centered>
					<Grid.Column textAlign="center">
						<Header color="grey">
							
							Login using your credentials!
						</Header>
						<LoginForm />
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

Login.propTypes = {
	actions: PropTypes.object.isRequired
};

const mapDispatch = (dispatch) => {
	return {
		actions: bindActionCreators(authenticationActions, dispatch)
	};
};

export default connect(null, mapDispatch)(Login);