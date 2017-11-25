import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppRoutes from './modules/app/routes';
import AuthRoutes from './modules/auth/routes';

let routes = [];
routes = routes.concat(AppRoutes);
routes = routes.concat(AuthRoutes);

export default <Switch>
	{routes}
</Switch>;