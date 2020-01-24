const express = require('express');
const session  = require('express-session');
const connect = require('connect');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('./config/passport');

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 },
    rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./app/routes/index'));

module.exports = app;