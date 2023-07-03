import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default (passport) => {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8050/api/auth/customer/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
}


// id_ed25519
