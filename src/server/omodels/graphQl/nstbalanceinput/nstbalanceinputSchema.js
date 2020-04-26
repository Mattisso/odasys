
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLInt, GraphQLNonNull} = require('graphql');

const nstbalanceinputSchema=(function(){
  const nstBalanceInputType = new GraphQLObjectType({
    name: 'nstBalanceInput',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      NumCompte: {
        type: new GraphQLNonNull(GraphQLString)
      },
      IntitulCompte: {
        type: new GraphQLNonNull(GraphQLString)
      },     
      SoldeDebit: {
        type: GraphQLInt
      },
      CompteNumber: {
        type: GraphQLString
      },
      SoldeCredit: {
        type: GraphQLInt
      },
      
    })
  });
  function toinit(){
    return {
      nstBalanceInputType:nstBalanceInputType

    };
  }
  return {
    toinit:toinit
  };
})();
module.exports={
  toinit:nstbalanceinputSchema.toinit
};


