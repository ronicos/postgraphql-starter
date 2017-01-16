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
    return userService.login(args.email, args.password).then((token) => ({ token }));
  },
};
