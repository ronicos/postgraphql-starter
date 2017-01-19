import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { login } from './types/login';
import { register } from './types/register';
import { requestPasswordReset } from './types/request-password-reset';
import { resetPassword } from './types/reset-password';

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    name: {
      type: GraphQLString,
      resolve: () => 'viewer'
    },
    login,
    requestPasswordReset,
  }
});

const rootQueryType = new GraphQLObjectType({
  name: 'CustomQuery',
  fields: {
    viewer: {
      type: viewerType,
      resolve: () => {
        return "success"
      }
    }
  }
});

const rootMutationType = new GraphQLObjectType({
  name: 'CustomMutation',
  fields: {
    register,
    resetPassword
  }
});

export const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
});
