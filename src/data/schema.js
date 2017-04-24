/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
} from 'graphql';
import {
  UserType,
  ProjectType,
  DeploymentType,
  DeviceType,
  RepoType,
} from './types';
import Octokat from 'octokat';
import {Project} from '../core/db';

const me = {
  type: UserType,
  resolve({ request }) {
    console.log("demo: " + JSON.stringify(request.user));

    return request.user && {
        id: request.user._id,
        fullName: request.user.fullName,
        pic: request.user.pic,
        //json: JSON.stringify(request.user),
      };
  },
};

const projects = {
  type: new ListType(ProjectType),
  async resolve({ request }) {
    if(!request.user){
      return;
    }

    let result = await Project.find({userId: request.user.id});
    return result;
  }
};

const repos = {
  type: new ListType(RepoType),
  async resolve({ request }) {
    if(!request.user){
      return;
    }

    let octo = new Octokat({token: request.user.githubToken});
    let result = await octo.users(request.user.githubName).repos.fetch();

    return result.items.map(val => {
      return {
        id: val.id,
        name: val.fullName,
        branches: ['master', 'develop'],
        gitUrl: val.gitUrl,
        htmlUrl: val.htmlUrl
      };
    });
  }
};

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      projects,
      repos,
    },
  }),
});

export default schema;
