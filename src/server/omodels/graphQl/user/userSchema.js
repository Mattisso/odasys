const graphql = require('graphql');
// const {User} = require('../../modelsSchema/index').toinit();
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLNonNull,
  GraphQLInt} = graphql;

const userSchema = (function () {
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {
        type: GraphQLID,
        resolve: (root, args, context, info) => {
          return root.id
        }
      },
      username: {
        type: new GraphQLNonNull (GraphQLString),
        resolve: (root, args, context, info) => {
          return root.username
        }
      },
      role: {
        type: GraphQLString,
        resolve: (root, args, context, info) => {
          return root.role
        }
      },
      password: {
        type: GraphQLString,
        resolve: (root, args, context, info) => {
          return root.password
        }
      },
      loginAttempts: {
        type: GraphQLInt,
        resolve: (root, args, context, info) => {
          return root.loginAttempts
        }
      },
      lockUntil: {
        type: GraphQLInt,
        resolve: (root, args, context, info) => {
          return root.lockUntil
        }
      }
    })
  });

  function toinit() {

    return{
      UserType:UserType
    }  // userresolver
  };
  return {
    toinit: toinit
  }
})()
module.exports = {
  toinit: userSchema.toinit
}
//type Query { ... }
//type Mutation { ... }
// type Subscription { ... }
