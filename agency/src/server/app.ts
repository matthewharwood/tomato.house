/**
 * Created by matthewharwood on 5/21/2016.
 */
/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');


let app = express();

app.use(express.static('dist/client/app'));
app.use('/images', express.static(path.join(__dirname, '../client/_assets/images')));
app.use('/css', express.static(path.join(__dirname, '../client/_assets/css')));
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + 'dist/client/app/index.html'));
});


app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});