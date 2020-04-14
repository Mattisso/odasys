const {UserType}=require('./userSchema').toinit()

const userSubscription=(function(){
  const toNewUser= {
    type: UserType
   /*  args: {
      username: {
        type: GraphQLID
      }
    } */
  }

function toinit(){
  return {
    toNewUser:toNewUser
  }
}
return {
  toinit:toinit
}
})()
module.exports={
  toinit:userSubscription.toinit
}
