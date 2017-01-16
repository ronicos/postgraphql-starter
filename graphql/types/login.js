import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import { userService } from '../../models/user/user-service';

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

    return userService.login(email, password).then((token) => ({ token }));
  },
};
