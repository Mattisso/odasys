/* const graphql = require('graphql');
const {User} = require('../../omodels/modelsSchema/index').toinit();
const {UserType}=require('./userSchema').toinit()
const { GraphQLObjectType,  GraphQLString,  GraphQLID,  GraphQLSchema,  GraphQLList,  GraphQLNonNull,
  GraphQLInt} = graphql;

const userQuery = (function () {

  const UserRootQuery = new GraphQLObjectType({
    name: 'UserRootQueryType',
    fields: {
      getuser: {
        type: UserType,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(parent, args) {
       
          return User.findById(args.id);
        }
      },
      getusers: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return  User.find({});
        }
      }

    }
  });
  function toinit(){
    return {
      UserRootQuery:UserRootQuery
    }
  }
  return {
toinit:toinit
  }
})()
module.exports={
toinit:userQuery.toinit
}
 */