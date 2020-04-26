/* const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID,  GraphQLSchema,  GraphQLNonNull,
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
      }
    })
  }); */
/*
  const UserRootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      getuser: {
        type: UserType,
        //argument passed by the user while making the query
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(parent, args) {
          //Here we define how to get data from database source

          //this will return the book with id passed in argument by the user
          return User.findById(args.id);
        }
      },
      getusers: {
        type: new GraphQLList(UserType),
        //argument passed by the user while making the query
        resolve(parent, args) {
          //Here we define how to get data from database source

          //this will return the book with id passed in argument by the user
          return  User.find({});
        }
      }

    }
  });
  const UserMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          //GraphQLNonNull make these field required
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          role: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(parent, args) {
          let user = new User({
            username: args.username,
            role: args.role,
            password: args.password
          });
          return user.save();
        }
      }

    }
  });
 */
  //)
  /* function toinit() {
    /* const userresolver = //new GraphQLSchema(
      {
      userQuery: UserRootQuery,
      userMutation: UserMutation
      ///userSubscription
    } */
 /*    return{
      UserType:UserType
    }  // userresolver
  }; */
 /* return {
    toinit: toinit
  }
})()
module.exports = {
  toinit: userSchema.toinit
} */
//type Query { ... }
//type Mutation { ... }
// type Subscription { ... }
