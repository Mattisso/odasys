const {UserType}=require('./userSchema').toinit();
const graphql = require('graphql');
const { GraphQLID, GraphQLList, GraphQLString} = graphql;

const userSubscription=(function(){
  const toNewUser= {
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
    }
  };

function toinit(){
  return {
    toNewUser:toNewUser
  };
}
return {
  toinit:toinit
};
})();
module.exports={
  toinit:userSubscription.toinit
};
