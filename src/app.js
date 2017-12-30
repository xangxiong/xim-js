import Express from 'express';
import Webpack from 'webpack';
import React from 'react';
import config from '../webpack.config.js';

import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { sessionService, sessionReducer } from 'redux-react-session';

import routes from './routes';

const env = process.env.NODE_ENV || 'development';
const dev = (env !== 'production');
const app = Express();
app.set('env', env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.pretty = true;
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (dev) {
	const compiler = new Webpack(config);
	
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	app.use(Express.static(path.join(__dirname, 'images')));
} else {
	app.use(Express.static(__dirname + '../dist'));
}

/*eslint-disable*/
const router = Express.Router();
/*eslint-enable*/
const reducer = combineReducers({
	session: sessionReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

router.get('*', (req, res) => {
	sessionService.initServerSession(store, req);
	
	const branch = matchRoutes(routes, req.url);
	const promises = branch.map(({route}) => {
		let fetchData = (route.component) ? route.component.fetchData : null;
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
			title: 'XIM - JS',
			data: store.getState(),
			content
		});
	});
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
if (app.get('env') === 'development') {
	// development error handler
	// will print stacktrace
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

export default app;