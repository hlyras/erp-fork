const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();

app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://earnest-mandazi-85ed13.netlify.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('./config/passport');

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
// app.use(express.favicon(__dirname + '/public/images/favicon/favicon-black.ico'));
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

app.use(function (req, res, next) {
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  });
});

module.exports = app;