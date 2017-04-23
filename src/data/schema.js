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
} from './types';

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
  resolve({ request }) {

  }
};

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      projects
    },
  }),
});

export default schema;
