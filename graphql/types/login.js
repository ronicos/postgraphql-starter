import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userAccountService } from '../../models/user-account/user-account-service';

export const loginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

export const login = {
  type: loginType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (object, args, context) => {
    const { email, password } = args;

    return userAccountService.login(email, password).then((token) => ({ token }));
  },
};
