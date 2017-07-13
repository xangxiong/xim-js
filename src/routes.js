import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppRoutes from './modules/app/routes';
import AuthRoutes from './modules/auth/routes';

export default (
	<div id="routes">
		{AuthRoutes}
		{AppRoutes}
	</div>
);