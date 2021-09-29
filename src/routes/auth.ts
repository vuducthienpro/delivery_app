import e, { Router } from 'express';
import passport from 'passport';
import passportLine from 'passport-line-auth';
import passportGoogle from 'passport-google-oauth2';
import dotenv from 'dotenv';
import User from '../models/User';
const LineStrategy = passportLine.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const router = Router();
dotenv.config();

// router test auth
router.get('/', (req, res) => {
  res.send('<a href="/auth/line">Login Line</a></br><a href="/auth/google">Login Google</a>');
});

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
          userModel.save();
        }

        if (err) {
          return done(err);
        }
      });
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

router.get('/line/callback',
  passport.authenticate('line', {
    failureRedirect: '/login',
    successRedirect: '/success',
  })
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

export default router;