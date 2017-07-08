import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppRoutes from './app/routes';
import AuthRoutes from './auth/routes';

export default (
	<Switch>
		{AppRoutes}
		{AuthRoutes}
	</Switch>
);