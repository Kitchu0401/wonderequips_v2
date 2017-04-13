import express from 'express';
import session from 'express-session';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import mongoose from 'mongoose';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import path from 'path';
import route from './routes/route';

const app = express();
const port = 3000;
const devPort = 4000;

// Setting up middleware: body-parser
app.use(morgan('dev'));
app.use(bodyParser.json()); // for application/json
app.use(bodyParser.urlencoded({ extended: true })); // for application/x-www-form-urlencoded

// Setting up middleware: express-session
app.use(session({
    secret: 'wonderequips',
    resave: false,
    saveUninitialized: true
}));

// Serving static files
// app.use(express.static('./../public'));
app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', route);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server.') });
mongoose.connect('mongodb://localhost/wonderequips');

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if ( process.env.NODE_ENV === 'development' ) {
    console.log('Server is running on development mode');
    // const config = require('../webpack.dev.config');
    const config = require('./../config/webpack.config.dev');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}


// package.json scripts backup
// "scripts": {
//     "build": "babel src -d build --presets=es2015",
//     "start": "node ./build/main.js",
//     "development": "NODE_ENV=development nodemon --exec babel-node --presets=es2015 ./src/main.js --watch server",
//     "win_development": "set NODE_ENV=development&nodemon --exec babel-node --presets=es2015 ./src/main.js --watch server",
//     "test": "echo \"Error: no test specified\" && exit 1"
// },