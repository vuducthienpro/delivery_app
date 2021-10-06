import e, { Router } from 'express';
import passport from 'passport';
import passportLine from 'passport-line-auth';
import passportGoogle from 'passport-google-oauth2';
import dotenv from 'dotenv';
import User from '../models/User';
import request from 'request-promise';
import winston from '../config/winston';
import jwt from 'jsonwebtoken';
import { HEADER_JWT_ALG } from '../config/constant';
import { json } from 'body-parser';

const LineStrategy = passportLine.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const router = Router();
dotenv.config();

// auth line
passport.use(
  new LineStrategy(
    {
      channelID: process.env.CHANNEL_ID,
      channelSecret: process.env.CHANNEL_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'openid'],
      botPrompt: 'normal',
      uiLocales: 'en-US',
    },
    (res, accessToken, refreshToken, profile, done) => {
      User.find(
        {
          social: profile.provider,
          social_id: profile.id,
        },
        (err, user) => {
          if (user.length === 0) {
            const data = new User({
              name: profile.displayName,
              email: profile.email,
              social: profile.provider,
              social_id: profile.id,
            });
            const userModel = new User(data);
            userModel.save();
          }

          if (err) {
            return done(err);
          }
        },
      );
      return done(null, profile);
    },
  ),
);

// auth google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      winston.info(accessToken);
      User.find(
        {
          social: profile.provider,
          social_id: profile.id,
        },
        (err, user) => {
          if (user.length === 0) {
            const data = new User({
              name: profile.displayName,
              email: profile.email,
              avatar: profile.picture,
              social: profile.provider,
              social_id: profile.id,
            });
            const userModel = new User(data);
            userModel.save();
          }

          if (err) {
            return done(err);
          }
        },
      );
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

router.get(
  '/line',
  passport.authenticate('line', {
    scope: ['profile'],
  }),
);

router.get(
  '/line/callback',
  passport.authenticate('line', {
    failureRedirect: '/login',
    successRedirect: '/success',
  }),
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failed',
  }),
);

router.post('/login-google', async (req, res) => {
  try {
    const tokenGoogle = req.body.token;
    const dataGoogle = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenGoogle}`;
    let resultGoogle = await request({ method: 'GET', url: dataGoogle });
    winston.info(resultGoogle);
    resultGoogle = JSON.parse(resultGoogle);
    const fillUser = await User.findOne({ social: 'google', social_id: resultGoogle.id });
    let token: string;
    if (fillUser) {
      token = await jwt.sign({ id: fillUser._id }, HEADER_JWT_ALG);
      return res.send(token);
    }
    const createUser = await User.create({
      name: resultGoogle.name,
      email: resultGoogle.email,
      avatar: resultGoogle.picture,
      social: 'google',
      social_id: resultGoogle.id,
    });
    token = await jwt.sign({ id: createUser._id }, HEADER_JWT_ALG);
    return res.send(token);
  } catch (error) {
    return res.json({
      error: JSON.parse(error.error),
    });
  }
});


router.post('/login-line', async (req, res) => {
  try {
    const tokenLine = req.body.token;
    const dataLine = `https://api.line.me/oauth2/v2.1/verify`;
    let resultLine = await request({ method: 'POST', url: dataLine, body: { id_token: tokenLine } });
    // winston.info(resultGoogle);
    resultLine = JSON.parse(resultLine);
    const fillUser = await User.findOne({ social: 'google', social_id: resultLine.id });
    let token: string;
    if (fillUser) {
      token = await jwt.sign({ id: fillUser._id }, HEADER_JWT_ALG);
      return res.send(token);
    }
    const createUser = await User.create({
      name: resultLine.name,
      email: resultLine.email,
      avatar: resultLine.picture,
      social: 'line',
      social_id: resultLine.id,
    });
    token = await jwt.sign({ id: createUser._id }, HEADER_JWT_ALG);
    return res.send(token);
  } catch (error) {
    return res.json({
      error: JSON.parse(error.error),
    });
  }
});

export default router;
