const {toNewUser}=require('./user/userSubscription').toinit();
const {getoreference,getoreferences}=require('./oreference/oreferenceQuery').toinit();
const {getocompte,getocomptes}=require('./ocompte/ocompteQuery').toinit();
// const {createOcompteMutation}=require('./ocompte/ocompteMutation').toinit();
// const { GraphQLObjectType} =require('graphql');

const subscriptions=(function(){

const getRootSubscriptions=  {
  toNewUser:toNewUser


}


function toinit(){
  return {
    getRootSubscriptions:getRootSubscriptions
   // getmutation:getmutation

  }
}
return {
  toinit:toinit
}
})()
module.exports={
  toinit:subscriptions.toinit
}
