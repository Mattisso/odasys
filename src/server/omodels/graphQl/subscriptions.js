const {toNewUser}=require('./user/userSubscription').toinit();
const {toNewNstbalanceInput}=require('./nstbalanceinput/nstbalanceinputSubscription').toinit();

const {PubSub}=require('graphql-subscriptions');
const pubsub= new PubSub();

const subscriptions=(function(){
  const rrr ='toNewNstbalanceInput';
  const getRootSubscriptions =  {
    toNewUser:toNewUser,
    toNewNstbalanceInput :toNewNstbalanceInput
  /*   {
       subscribe:()=> pubsub.asyncIterator(toNewNstbalanceInput)

      } */
     };


   // subscribe:()=> pubsub.asyncIterator(toNewUser)



  /* toNewNstbalanceInput:{
    subscribe:()=> pubsub.asyncIterator(toNewNstbalanceInput)
  },

  toNewUser:{
    subscribe:()=> pubsub.asyncIterator(toNewUser)
  } */

  //toNewUser:toNewUser,
  //toNewNstbalanceInput:toNewNstbalanceInput
// };

function toinit(){

  return {
    getRootSubscriptions:getRootSubscriptions
   // getmutation:getmutation

  };
}
return {
  toinit:toinit
};
})();
module.exports={
  toinit:subscriptions.toinit
};
