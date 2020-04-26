const { Observable,pipe } = require('rxjs');

const {hasitem,isValid}=require('../odaUtility').toinit();
const toDeleteInstance=(function() {

  function todeleteBuild(requestBody) {
  }
  const toDeleteInstance = function (body) {
    const data = todeleteBuild(body);
    return data;
  };

function toinit(){
return {
  toDeleteInstance:toDeleteInstance
};
}
return {
  toinit:toinit
};
  })();
  module.exports={
toinit:toDeleteInstance.toinit
  };
