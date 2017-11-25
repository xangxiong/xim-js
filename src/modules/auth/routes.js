import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import css from './auth.css';

export default [
	<Route path="/login" key="login" component={Login} />,
	<Route path="/logout" key="logout" component={Logout} />
];