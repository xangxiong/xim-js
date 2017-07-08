import React from 'react';
import { Route } from 'react-router-dom';
import Index from './index';

const App = (props) => (
	<div className="app">
		<Route path="/" component={Index} />
	</div>
);

export default App;