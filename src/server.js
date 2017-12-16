import path from 'path';
import { Server } from 'http';
import Express from 'express';
import Webpack from 'webpack';
import React from 'react';
import config from '../webpack.config.js';
import open from 'open';
import favicon from 'serve-favicon';
import { renderToString } from 'react-dom/server';
import { matchPath, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { sessionService, sessionReducer } from 'redux-react-session';
import routes from './routes';

const serv_ren = process.env.SERV_REN !== false;
const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3000 : process.env.PORT;
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (dev) {
	const compiler = new Webpack(config);
	
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	app.use(favicon(path.join(__dirname, 'favicon.ico')));
	app.use(Express.static(path.join(__dirname, 'images')));
	
	if (!serv_ren) {
		app.get('*', function(req, res) {
			res.sendFile(path.join( __dirname, 'views', 'index.html'));
		});
	}
} else {
	app.use(Express.static(__dirname + '../dist'));
	
	if (!serv_ren) {
		app.get('*', function response(req, res) {
			res.sendFile(path.join(__dirname, '../dist/views/index.html'));
		});
	}
}

if (serv_ren) {
	const handleRender = (req, res) => {
		const reducer = combineReducers({
			session: sessionReducer
		});
		const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));
		sessionService.initServerSession(store, req);
		
		// NOTE: this no longer works for react-router 4
		matchPath(
			{ routes, location: req.url },
			(err, redirectLocation, renderProps) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				
				if (redirectLocation) {
					return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
				}
				
				let markup;
				if (renderProps) {
					markup = renderToString(
						<Provider store={store} key="provider">
							<RouterContext {...renderProps} />
						</Provider>
					);
				}
				
				const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');			
				return res.render('index', { markup, preloadedState });
			}
		);
	};
	app.use(handleRender);
}

server.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	
	console.info(`Server running on http://localhost:${port}`);
});