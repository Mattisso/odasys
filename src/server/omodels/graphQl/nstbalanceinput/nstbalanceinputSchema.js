
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLInt} = require('graphql');

const nstbalanceinputSchema=(function(){
  const nstBalanceInputType = new GraphQLObjectType({
    name: 'nstBalanceInput',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      SoldeDebit: {
        type: GraphQLInt
      },
      CompteNumber: {
        type: GraphQLInt
      },
      SoldeCredit: {
        type: GraphQLInt
      },
      IntitulCompte: {
        type: GraphQLString
      },
      NumCompte: {
        type: GraphQLString
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


