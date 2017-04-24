/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from './db';

/**
 * Github Sign In
 */
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(JSON.stringify(profile));

    console.log("Got response: " + JSON.stringify(profile));
    console.log("\nGot token: " + accessToken);


    User.find({ githubId: profile.id }, function (err, usr) {
      if(!err && usr.length >= 1){
        console.log("Found usr: " + JSON.stringify(usr[0]));
        return done(null, usr[0]);
      }

      let user = new User({
        githubToken: accessToken,
        githubRefresh: refreshToken,
        githubId: profile.id,
        fullName: profile.displayName,
        pic: profile._json.avatar_url,
        githubName: profile.username
      });

      console.log('created user: ' + JSON.stringify(user));

      return user.save((err) => {
        return done(err, user);
      })

    });
  }
));

export default passport;
