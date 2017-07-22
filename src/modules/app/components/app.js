import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Sidebar, Segment } from 'semantic-ui-react';
import TopMenu from './top-menu';
import LeftMenu from './left-menu';

class App extends React.Component {
	render() {
		return (
			<div>
				<LeftMenu />
				<TopMenu />
				<Sidebar.Pusher>
					App
				</Sidebar.Pusher>
			</div>
		);
	}
}

export default App;