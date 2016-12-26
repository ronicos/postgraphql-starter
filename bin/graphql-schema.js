import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { userRepository } from '../models/user/user-reposirory';

const query = new GraphQLObjectType({
  name: 'RootQuery',
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

export const schema = new GraphQLSchema({
  query
});
