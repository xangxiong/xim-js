import React from 'react';
//import PropTypes from 'prop-types';
//import { Route, Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { Sidebar, Segment } from 'semantic-ui-react';
//import PrivateRoute from '../../auth/components/private-route';
//import TopMenu from './top-menu';
//import LeftMenu from './left-menu';

class App extends React.Component {
	render() {
		/*
		return (
			<div>
				{ this.props.session.checked && 
				<PrivateRoute exact path="/" authenticated={this.props.session.authenticated}/>
				}
				<LeftMenu />
				<TopMenu user={this.props.session.user} />
				<Sidebar.Pusher>
					App
				</Sidebar.Pusher>
			</div>
		);
		*/
		return (
			<div>testing</div>
		);
	}
}

/*
App.propTypes = {
	session: PropTypes.object.isRequired
};

const mapState = (state) => ({
	session: state.session
});

const mapDispatch = (dispatch) => {
	return {
		
	};
};

export default connect(mapState, mapDispatch)(App);
*/
export default App;