
const userResolver=(function(){

 
function toinit(){
  return {
    UserMutation:UserMutation
  }
}
return {
  toinit:toinit
}
})()
module.exports={
  toinit:userResolver.toinit
}
