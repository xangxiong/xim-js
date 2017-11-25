import React from 'react';
import {Redirect} from 'react-router';

class Logout extends React.Component {
	// TODO: we need to remove any session data
	
	render() {
		return (
			<Redirect to="/login" />
		);
	}
}

export default Logout;