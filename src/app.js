import Express from 'express';
import Webpack from 'webpack';
import React from 'react';
import config from '../webpack.config.js';

import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

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

app.get('*', function response(req, res) {
	res.render('index', {
		title: 'XIM - JS'
	});
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