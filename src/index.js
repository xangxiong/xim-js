/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from './routes';

render((
	<BrowserRouter>
		{routes}
	</BrowserRouter>
), document.getElementById('app'));