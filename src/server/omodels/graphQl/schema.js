const {RootQuery, RootMutation, RootSubscrition}=require('./resolvers').toinit();
// const {RootQuery}=require('./graphQueryType').toinit();

const {GraphQLSchema} = require('graphql');


const schema=(function(){
    const myresolver= new GraphQLSchema({
        query: RootQuery,
      mutation:RootMutation,
      subscription:RootSubscrition
     //   mutation:Mutation.createUserMutation
    } );

function toinit(){
    return myresolver;
}
return {
    toinit:toinit
};
})();
module.exports={
    toinit:schema.toinit
};
