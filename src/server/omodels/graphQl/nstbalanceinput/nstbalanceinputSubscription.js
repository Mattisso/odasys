
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLInt, GraphQLNonNull} = require('graphql');
const {nstBalanceInputType}=require('./nstbalanceinputSchema').toinit();


const {PubSub}=require('graphql-subscriptions');
const pubsub= new PubSub();
const nstbalanceinputSubscription=(function(){
  const newLocal = 'toNewNstbalanceInput';
  const toNewNstbalanceInput = {
    type:  nstBalanceInputType,
    args: {
      NumCompte: {
        type: GraphQLString
      },
      IntitulCompte: {
        type: GraphQLString
      },
      SoldeDebit: {
        type: GraphQLInt
      },
      SoldeCredit: {
        type: GraphQLInt
      }
    },
    subscribe:()=> pubsub.asyncIterator('toNewNstbalanceInput')

    };

  // subscribe:()=> pubsub.asyncIterator(newLocal)




  function toinit(){
    return {
      toNewNstbalanceInput:toNewNstbalanceInput


    };
  }
  return {
    toinit:toinit
  };
})();
module.exports={
  toinit:nstbalanceinputSubscription.toinit
};


