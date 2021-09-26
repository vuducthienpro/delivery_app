import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';
import cookieSession from 'cookie-session';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import mongoose from 'mongoose';
import config from './config/options';
const GoogleStrategy = passportGoogle.Strategy;

// routers
// import indexRouter from './routes/index';
import runningRouter from './routes/running';
import crawlRouter from './routes/crawl';

import winston from './config/winston';

// initialize configuration
dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL, config.mongo.options)
  .then((result) => {
    winston.info('connect success1');
  })
  .catch((error) => {
    winston.info('error');
  });

app.use(
  cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    maxAge: 5000,
  }),
);
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// auth google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientIDGoogle,
      clientSecret: process.env.clientSecretGoogle,
      callbackURL: process.env.callbackURLGoogle,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      winston.info(accessToken);
      winston.info('profile');
      winston.info(profile);
      return done(null, profile);
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// app.use('/', indexRouter);
app.use('/running', runningRouter);
app.use('/crawl', crawlRouter);

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failed',
  }),
);

app.get('/failed', (req, res) => {
  res.json({
    status: 404,
    result: 'Failed',
  });
});
app.get('/success', isLoggedIn, (req, res) => {
  res.json({
    status: 200,
    result: 'Welcome',
  });
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

// // catch 404 and forward to error handler
app.use((req, res, next) => {
  next('dddd');
  // next(createError(404));
});

// error handler
app.use((param, req, res, next) => {
  winston.error(param);

  // set locals, only providing error in development
  res.locals.message = 'abc';
  res.locals.error = req.app.get('env') === 'development' ? 'err' : {};

  // render the error page
  res.status(404);
  res.send({ message: 'sai cmnr' });
});

const port = process.env.APP_PORT; // default port to listen
// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
