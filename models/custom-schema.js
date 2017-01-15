import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { userService } from './user/user-service';

const loginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    name: {
      type: GraphQLString,
      resolve: () => 'viewer'
    },
    login: {
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
    },
    register: {
      type: GraphQLString,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (object, args, context) => {
        return userService.register('', args.email, args.password);
      },
    }
  }
});

const rootQueryType = new GraphQLObjectType({
  name: 'CustomQuery',
  fields: {
    viewer: {
      type: viewerType,
      resolve: () => {
        return "success"
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: rootQueryType
});
