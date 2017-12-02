import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.js';
import open from 'open';
import favicon from 'serve-favicon';
//import { renderToString } from 'react-dom/server';
//import { match, RouterContext } from 'react-router';
//import { Provider } from 'react-redux';
//import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
//import { sessionService, sessionReducer } from 'redux-react-session';

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3000 : process.env.PORT;
const app = express();

if (dev) {
	const compiler = webpack(config);
	
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	app.use(favicon(path.join(__dirname, 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'images')));
	
	/* NOTE: if this is enabled, will load forever.  Looks like this is use for server side rendering only.  Will re-enable once we get there.
	app.use((req, res) => {
		const reducer = combineReducers({
			session: sessionReducer
		});
		const store = createStore(reducer);
		sessionService.initServerSession(store, req);
	});
	*/
	
	app.get('*', function(req, res) {
		res.sendFile(path.join( __dirname, 'index.html'));
	});
} else {
	app.use(express.static(__dirname + '../dist'));
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, '../dist/index.html'));
	});
}

app.listen(port, '0.0.0.0', function(err) {
	if (err) {
		console.log(err);
	}
	
	console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});