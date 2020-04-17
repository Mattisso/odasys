const {tocreateUser}=require('./user/userMutation').toinit();
const {getoreference,getoreferences}=require('./oreference/oreferenceQuery').toinit();
const {getocompte,getocomptes}=require('./ocompte/ocompteQuery').toinit();

const mutations=(function(){
  const  togetRootMutation= {
    tocreateUser:tocreateUser
  };
  function toinit() {
    return {
      togetRootMutation:togetRootMutation
    };
  }
  return {
    toinit:toinit
  };
}
)();
module.exports={
  toinit:mutations.toinit
};
