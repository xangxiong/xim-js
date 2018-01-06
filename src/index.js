import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunk from 'redux-thunk';
import routes from './routes';
import semanticCss from 'semantic-ui/dist/semantic.css';

const reducer = combineReducers({
	session: sessionReducer
});
const store = createStore(reducer, applyMiddleware(thunk));
sessionService.initSessionService(store, {
	driver: 'COOKIES',
	refreshOnCheckAuth: true,
	redirectPath: '/login'
});

render((
	<Provider store={store}>
		<BrowserRouter>
			<div id="routes">
				<Switch>
					{routes}
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
), document.getElementById('app'));