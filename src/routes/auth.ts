import e, { Router } from 'express';
import passport from 'passport';
import passportLine from 'passport-line-auth';
import winston from '../config/winston';
import dotenv from 'dotenv';
import User from '../models/User';
const LineStrategy = passportLine.Strategy;

const router = Router();
dotenv.config();

router.get('/', (req, res) => {
  res.send('<a href="/auth/line">Login Google</a>');
});

passport.use(
  new LineStrategy(
    {
      channelID: process.env.CHANNEL_ID,
      channelSecret: process.env.CHANNEL_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'openid'],
      botPrompt: 'normal',
      uiLocales: 'en-US',
    }, (res, accessToken, refreshToken, profile, done) => {
      User.find({
        social: profile.provider,
        social_id: profile.id,
      }, (err, user) => {
        if (user.length === 0) {
          const data = new User({
            name: profile.displayName,
            email: profile.email,
            social: profile.provider,
            social_id: profile.id,
          });
          const userModel = new User(data);
          userModel.save()
          .then((value) => res.json(value));
        }

        if (err) {
          return done(err);
        }
      });
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

router.get('/line/callback',
  passport.authenticate('line', {
    failureRedirect: '/login',
    successRedirect: '/success',
  })
);

export default router;