import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userService } from '../../models/user/user-service';

export const resetPasswordType = new GraphQLObjectType({
  name: 'ResetPassword',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

export const resetPassword = {
  type: resetPasswordType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    token: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (object, args, context) => {
    const { email, password, token } = args;

    return userService.resetPassword(email, password, token)
      .then(() => userService.login(email, password))
      .then((token) => ({ token }));
  },
};
