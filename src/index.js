import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';
import routes from './routes';
import semanticCss from 'semantic-ui/dist/semantic.css';

const reducer = combineReducers({
	session: sessionReducer
});
const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));
sessionService.initSessionService(store, {
	driver: 'COOKIES',
	refreshOnCheckAuth: true,
	redirectPath: '/login'
});

render((
	<Provider store={store}>
		<BrowserRouter>
			<div id="routes">
				{routes}
			</div>
		</BrowserRouter>
	</Provider>
), document.getElementById('app'));