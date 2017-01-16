import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userAccountService } from '../../models/user-account/user-account-service';

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
    return userAccountService.register('', args.email, args.password).then((token) => ({ token }));
  },
};
