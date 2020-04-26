const {getrootqueries}=require('./queryTypes').toinit();
const {togetRootMutation}=require('./mutations').toinit();
const {getRootSubscriptions}=require('./subscriptions').toinit();
const {GraphQLObjectType}=require('graphql');

const graphQlResolvers=(function(){

  const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: function(){
return getrootqueries;
      }

    });

    const RootSubscrition = new GraphQLObjectType({
      name: 'subscription',
      fields: function(){
  return getRootSubscriptions;
        }

      });

    const RootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => {
        return togetRootMutation;
      }
    });

function toinit(){
  return {
    RootQuery:RootQuery,
    RootMutation:RootMutation,
    RootSubscrition:RootSubscrition

  };
}
return {
  toinit:toinit
};
})();
module.exports={
  toinit:graphQlResolvers.toinit
};
