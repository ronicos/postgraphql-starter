import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userService } from '../../models/user/user-service';

export const requestPasswordResetType = new GraphQLObjectType({
  name: 'RequestPasswordReset',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

export const requestPasswordReset = {
  type: requestPasswordResetType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (object, args, context) => {
    const { email } = args;

    return userService.requestPasswordReset(email).then((token) => ({ token }));
  },
};
