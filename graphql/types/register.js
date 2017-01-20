import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';

import { userAccountService } from '../../models/user-account/user-account-service';

const RegisterInputType = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    clientMutationId: {
      type: GraphQLString
    }
  }
});

const RegisterPayloadType = new GraphQLObjectType({
  name: 'RegisterPayload',
  fields: {
    token: {
      type: GraphQLString
    },
    clientMutationId: {
      type: GraphQLString
    }
  }
});

export const register = {
  name: 'Register',
  type: RegisterPayloadType,
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
