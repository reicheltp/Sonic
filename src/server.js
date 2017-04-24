/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* @flow */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import React from 'react';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import schema from './data/schema';
import Router from './routes';
import assets from './assets';
import { port, auth, analytics, databaseUrl } from './config';
import mongoose from 'mongoose';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';

mongoose.connect(databaseUrl);

const server = global.server = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
server.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user, done) =>{
  done(null, user._id);
});

passport.deserializeUser((id, done) =>{
  User.findById(id, function(err, user) {
    console.log("deserialized user: " + user._id);
    done(err, user);
  });
});

server.get('/logout', function(req, res){
  req.logout();
  res.clearCookie('id_token');
  res.redirect('/');
});

server.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email', 'public_repo' ] }));

server.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    console.log("create token: " + req.user);
    const token = jwt.sign(req.user.toObject(), auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });

server.post('/deployment', function(req, res){
  if(!req.user){
    return;
  }

  const {
    project,
    branch,
    projectName
  } = req.body;

  let sys = require('sys');
  let exec = require('child_process').exec;
  function puts(error, stdout, stderr) { sys.puts(stdout) }

  exec(`bash ./deploy.sh ${req.user.githubName}/${project} ${branch} ${projectName} ${req} ${req.user.githubToken}`, puts);
});


//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    console.log(JSON.stringify(req.header('id_token')));

    const networkInterface = createNetworkInterface({
      credentials: 'same-origin',
      uri: '/graphql',
      headers: {
        Cookie: req.header('id_token')
      }
    });

    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: networkInterface,
    });

    const css = [];
    const context = {
      client: client,
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => (data.title = value),
      onSetMeta: (key, value) => (data[key] = value),
      onPageNotFound: () => (statusCode = 404),
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade');
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
