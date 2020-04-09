"use strict";
const _ = require('lodash');
//const {toDeleteInstance}=require('./toDeleteInstance').toinit();
const {toInitializeInstance, svctoInitializeInstance$, toInitCustomInstance,svctoInitCustomInstance$} = require('./toInitializeInstance').toinit();
const {svctoUpdateInstance$, toUpdateInstance, svcapiupdate$,svcodaupdate$} = require('./toUpdateInstance').toinit();
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
      svcodaupdate$:svcodaupdate$
        };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: index.toinit
};
