/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import DashboardPage from './components/DashboardPage';
import {ApolloProvider} from 'react-apollo';

const routes = [
  require('./routes/home'),
  require('./routes/contact'),
  require('./routes/signin'),
];

const router = new Router(on => {
  on('*', async(state, next) => {
    const component = await next();
    return component &&
      <ApolloProvider client={state.context.client}>
        <App context={state.context}>
          {component}
        </App>
      </ApolloProvider>
      ;
  });

  on('/', async({context}) => {
    context.onSetTitle('Sonic');

    return <DashboardPage />
  });

  on('/projects/:id', async({context, params}) => {
    context.onSetTitle('Sonic');

    return <DashboardPage projectId={params.id}/>
  });

  on('/projects/:id/:tab', async({context, params}) => {
    context.onSetTitle('Sonic');

    return <DashboardPage projectId={params.id} selectedTab={params.tab}/>
  });

  on('/logout', ({context}) => {
    window.location.reload();
    return <App context={context} error><div>
      <h1>Sign Out</h1>
    </div></App>
  });

  on('/auth/github', ({context}) => {
    window.location.reload();
    return <App context={context} error><div>
      <h1>Sign In with Github</h1>
    </div></App>
  });

  routes.forEach(route => {
    on(route.path, route.action);
  });

  on('*', async(state) => {
    const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    const response = await fetch(query);
    const {data} = await response.json();
    return data && data.content && <ContentPage {...data.content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
