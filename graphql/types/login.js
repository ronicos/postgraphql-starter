import { GraphQLObjectType, GraphQLString } from 'graphql';

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
    }
  },
  resolve: (object, args, context) => {
    return userService.login(args.email)
      .then((res) => ({
        token: res
      }));
  },
};
