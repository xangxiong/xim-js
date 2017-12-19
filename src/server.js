import path from 'path';
import { Server } from 'http';
import Express from 'express';
import Webpack from 'webpack';
import React from 'react';
import config from '../webpack.config.js';

import open from 'open';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
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

app.locals.pretty = true;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

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
	/*eslint-disable*/
	const router = Express.Router();
	/*eslint-enable*/
	const reducer = combineReducers({
		session: sessionReducer
	});
	const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));	
	
	router.get('*', (req, res) => {
		sessionService.initServerSession(store, req);
		const branch = matchRoutes(routes, req.url);
		const promises = branch.map(({route}) => {
			let fetchData = route.component.fetchData;
			return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
		});
		
		return Promise.all(promises).then((data) => {
			let context = {};
			const content = renderToString(
				<Provider store={store}>
					<StaticRouter location={req.url} context={context}>
						{renderRoutes(routes)}
					</StaticRouter>
				</Provider>
			);
			
			if (context.status === 404) {
				res.status(404);
			}
			if (context.status == 302) {
				return res.redirect(302, context.url);
			}
			
			res.render('index', {
				data: store.getState(),
				context
			});
		});
	});
	
	app.use('/', router);
	app.use(function(req, res, next) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
}

if (dev) {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
} else {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

server.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	
	console.info(`Server running on http://localhost:${port}`);
});