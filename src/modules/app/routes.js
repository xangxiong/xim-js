import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import App from './components/app';
import css from './app.css';

export default [
	<Route path="/" key="app" component={App} />
];