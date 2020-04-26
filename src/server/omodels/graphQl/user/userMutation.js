const {UserType}=require('./userSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {User} = require('../../modelsSchema/index').toinit();

const userMutation=(function(){
  const tocreateUser=  {
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
      };




  function toinit(){
    return {
      tocreateUser:tocreateUser
    };
  }
  return {
toinit:toinit
  };
})();
module.exports = {
  toinit: userMutation.toinit
};
