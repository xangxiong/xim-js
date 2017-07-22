/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from './routes';

require('semantic-ui/dist/semantic.css');

render((
	<BrowserRouter>
		<div id="routes">
			{routes}
		</div>
	</BrowserRouter>
), document.getElementById('app'));