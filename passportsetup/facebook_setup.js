
const passport = require("passport");
const User = require("../models/facebook")
const facebookStrategy = require("passport-facebook").Strategy;

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'email']

},// facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            User.findOne({ 'uid': profile.id }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    console.log("user found")
                    console.log(user)
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.uid = profile.id; // set the users facebook id                   

                    newUser.name = profile.name.givenName;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });

        })

    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
