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
    register,
    requestPasswordReset,
    resetPassword
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

export const schema = new GraphQLSchema({
  query: rootQueryType
});
