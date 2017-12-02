import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoutes from './modules/auth/routes';
import AppRoutes from './modules/app/routes';

let routes = [];
routes = routes.concat(AuthRoutes);
routes = routes.concat(AppRoutes);

export default <Switch>
	{routes}
</Switch>;