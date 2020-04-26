const {UserType}=require('./userSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {User} = require('../../modelsSchema/index').toinit();

const userMutation=(function(){
  const toCreateUser = {
    type: UserType,
    args: {
      username: {
        type: GraphQLString
      },
      role: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }    
    },
    resolve(parent, args, context, info) {
      let user = new User({ username: args.username,
              role: args.role,
              password: args.password});
      return user.save();
    }
  };
  const toUpdateUser = {
    type: UserType,
    args: {},
    resolve(parent, args, context, info) {
      let user = new User({});
      return user.save();
    }
  };
  const toDeleteUser = {
    type: UserType,
    args: {},
    resolve(parent, args, context, info) {
      let user = new User({});
      return user.save();
    }
  };

  function toinit(){
    return {
      toCreateUser: toCreateUser,
			toUpdateUser: toUpdateUser,
      toDeleteUser: toDeleteUser
        };
  }
  return {
toinit:toinit
  };
})();
module.exports = {
  toinit: userMutation.toinit
};
