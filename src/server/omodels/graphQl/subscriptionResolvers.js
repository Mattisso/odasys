

const {PubSub}=require('graphql-subscriptions');
const pubsub= new PubSub();
const  subscriptionResolvers= (function(){
//  const toNew_NstbalanceInput = 'toNewNstbalanceInput';
 /*  const Subscription = {
    toNewNstbalanceInput:{
      subscribe:()=> pubsub.asyncIterator('toNewNstbalanceInput')
    },

    toNewUser:{
      subscribe:()=> pubsub.asyncIterator('toNewUser')
    }
  }; */
    /*   {
        subscribe:()=> pubsub.asyncIterator('toNewNstbalanceInput')
      }
*/
  function toinit(){
    return {
//Subscription:Subscription
    };
  }
return {
toinit:toinit
};
})();
module.exports={
toinit:subscriptionResolvers.toinit
};
