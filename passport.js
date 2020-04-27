const passport = require('passport'),
const FacebookTokenStrategy = require('passport-facebook-token')

passport.use('facebookToken', new FacebookTokenStrategy {
    clientID: 'config.oauth.facebook.clientID',
    clientSecret:'config.oauth.facebook.clientSecret'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile)
        console.log('paccessToken', accessToken)
        console.log('refreshToken', refreshToken

    } catch(error) {
        done(error, false, error.message);
    }
});