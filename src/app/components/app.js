import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

class App extends React.Component {
	render() {
		return (
			<div>
				<Icon className="alarm" />
				<div className="app">
					App
				</div>
			</div>
		);
	}
}

export default App;