import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userAccountService } from '../../models/user-account/user-account-service';

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

    return userAccountService.requestPasswordReset(email).then((token) => ({ token }));
  },
};
