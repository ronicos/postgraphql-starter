import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { login } from './types/login';
import { register } from './types/register';

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    name: {
      type: GraphQLString,
      resolve: () => 'viewer'
    },
    login,
    register,
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
