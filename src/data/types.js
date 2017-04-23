/**
 * Created by Paul on 23-Apr-17.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
  GraphQLID as IdType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(IdType) },
    fullName: { type: StringType },
    pic: { type: StringType },
    json: {type:StringType},
  },
});

export const DeploymentType = new ObjectType({
  name: 'Deployment',
  fields: {
    id: {type: IdType},
    version: {type: StringType},
    rollout: {type: IntType},
    date: {type: StringType},
  }
});

export const DeviceType = new ObjectType({
  name: 'Device',
  fields: {
    id: {type: IdType},
    name: {type: StringType},
    deployment: {type: DeploymentType},
    os: {type: StringType},
    deviceType: {type: StringType},
  }
});

export const ProjectType = new ObjectType({
  name: 'Project',
  fields: {
    id: {type: IdType},
    name: {type: StringType},
    url: {type: StringType},
    currentDeployment: {type: DeploymentType},
    history: {type: new ListType(DeploymentType)},
    devices: {type: new ListType(DeviceType)},
  }
});
