import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment } from 'semantic-ui-react';
import PrivateRoute from '../../auth/components/private-route';
import TopMenu from './top-menu';
import LeftMenu from './left-menu';

const App = ({ authenticated }) => (
	<div>
		<PrivateRoute exact path="/" authenticated={authenticated}/>
		<LeftMenu />
		<TopMenu />
		<Sidebar.Pusher>
			App
		</Sidebar.Pusher>
	</div>
);

const { bool } = PropTypes;

App.propTypes = {
	authenticated: bool.isRequired
};

const mapState = ({ session }) => ({
	authenticated: session.authenticated
});

export default connect(mapState)(App);