'use strict';

const express = require('express');
const logger = require('morgan');
const nunjucks = require('express-nunjucks');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.use(logger('dev'));

nunjucks.setup({
  autoescape: true,
  watch: true
}, app);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
