// Imports
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
  }, async (payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);
  
      // If user doesn't exists, handle it
      if (!user) {
        return done(null, false);
      }
  
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));
  // Facebook OAuth Strategy
  passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have user profile here
      console.log('profile', profile);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      
      const existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
  
      const newUser = new User({
        method: 'facebook',
        facebook: {
          id: profile.id,
          email: profile.emails[0].value
        }
      });
  
      await newUser.save();
      done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
  }));