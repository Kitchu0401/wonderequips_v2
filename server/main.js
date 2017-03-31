import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

// Setting up middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Serving static files
app.use('/', express.static(path.join(__dirname, './../public')));

// Loading APIs
// app.use('/api', api);

// app.get('/hello', (req, res) => {
//     return res.send('Hello Wonderequips_v2!');
// });

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server.') });
mongoose.connect('mongodb://localhost/wonderequips');

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if ( process.env.NODE_ENV == 'development' ) {
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