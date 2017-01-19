import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';

import { userAccountService } from '../../models/user-account/user-account-service';

export const registerType = new GraphQLObjectType({
  name: 'Register',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

const RegisterInputType = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export const register = {
  type: registerType,
  args: {
   input: {
     type: new GraphQLNonNull(RegisterInputType)
   }
  },
  resolve: (object, args, context) => {
    const { email, password } = args.input;
    console.log('register', email, password);

    return userAccountService.register('', email, password).then((token) => ({ token }));
  },
};
