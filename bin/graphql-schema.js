import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { userRepository } from '../models/user/user-reposirory';

const viewerType = new GraphQLObjectType({
  name: 'viewer',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (object, args, context) => {
        return userRepository.login(args.email);
      },
    }
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
