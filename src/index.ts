import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';
import cookieSession from 'cookie-session';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/options';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routers
import runningRouter from './routes/running';
import crawlRouter from './routes/crawl';
import authRouter from './routes/auth';
import categoryRouter from './routes/category';
import bannerRouter from './routes/banner';
import productRouter from './routes/product';
import customerRouter from './routes/customer';
import orderRouter from './routes/order';
import adminRouter from './routes/admin';
import feedbackRouter from './routes/feedback';
import uploadRouter from './routes/upload';
import packRouter from './routes/pack';

// log
import winston from './config/winston';

// models
import Models from './models';

// initialize configuration
dotenv.config();

const app = express();

// parse various different custom JSON types as JSON
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods:'GET,POST,PUT,DELETE',
  }),
);
app.use(cookieParser());

// upload image
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }));

mongoose
  .connect(process.env.DB_URL, config.mongo.options)
  .then((result) => {
    winston.info('connect success');
  })
  .catch((error) => {
    winston.info(error);
  });

app.use(
  cookieSession({
    name: 'auth-session',
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

Models;
// app.use('/', indexRouter);
app.use('/running', runningRouter);
app.use('/crawl', crawlRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/banner', bannerRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use('/feedback', feedbackRouter);
app.use('/upload',uploadRouter);
app.use('/pack',packRouter);
app.get('/', (req, res) => {
  res.cookie('vdthien', 'cookie', { httpOnly: true, maxAge: 3600000 });
  res.json({
    status: 200,
    result: 'test',
  });
});

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
