import { GraphQLObjectType, GraphQLString } from 'graphql';

import { userService } from '../../models/user/user-service';

export const registerType = new GraphQLObjectType({
  name: 'Register',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

export const register = {
  type: registerType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (object, args, context) => {
    return userService.register('', args.email, args.password);
  },
};
