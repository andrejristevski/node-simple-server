'use strict';

require("dotenv").config();

const express = require('express');
const app = express();

const passport = require('passport')
app.use(passport.initialize())
require('./passport/passport');

const routes = require('./routes/routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const url = process.env.DB_URL;
mongoose.connect(url);

app.use(bodyParser.json())

app.use('/api', routes);

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port 5000!')
});

module.exports = app;
