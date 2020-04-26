"use strict";
const _ = require('lodash');
//const {toDeleteInstance}=require('./toDeleteInstance').toinit();
const {toInitializeInstance, svctoInitializeInstance$, toInitCustomInstance,svctoInitCustomInstance$, svctoInitCustomInstance} = require('./toInitializeInstance').toinit();
const {svctoUpdateInstance$, toUpdateInstance, svcapiupdate$,svcodaupdate$, svctoUpdateCustomInstance, toUpdateCustomInstance} = require('./toUpdateInstance').toinit();
//const {toUpdateInstance,toapiUpdateInstance,toapiUpdateOtherInstance}=require('./toUpdateInstance').toinit();
const index = (function () {
  function toinit() {
    return {
      svctoInitializeInstance$:svctoInitializeInstance$,
      svctoUpdateInstance$:svctoUpdateInstance$,
      toInitializeInstance:toInitializeInstance,
      toUpdateInstance:toUpdateInstance,
      toInitCustomInstance:toInitCustomInstance,
      svctoInitCustomInstance$:svctoInitCustomInstance$,
      svcapiupdate$:svcapiupdate$,
      svcodaupdate$:svcodaupdate$,
      svctoInitCustomInstance:svctoInitCustomInstance,
      svctoUpdateCustomInstance:svctoUpdateCustomInstance,
      toUpdateCustomInstance:toUpdateCustomInstance
        };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: index.toinit
};
