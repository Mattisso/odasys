"use strict";
const _ = require('lodash');
//const {result$}=require('./loadnstbalance').toinit();
const {
  getall,
  index$,
  index$$,
  insert$,
  update$,
  delete$,
  odasearchby,
  getbyid$,
  nstbalanceload$,
  togetloadnstbalancedatas$,
  toupdateBPassif$,
  toupdateBS$,toupdateCH$,toupdateChgCredit$,toupdateDS$,toupdatePrdtDebit$,getallbyid$
} = require('./nstbalanceCtrl').toinit();

const index = (function () {

  function toinit() {
    return {
      getall:getall,
      nstbalanceload$: nstbalanceload$,
      insert$: insert$,
      update$: update$,
      delete$: delete$,
      getbyid$: getbyid$,
      index$$:index$$,
      index$: index$,
      odasearchby: odasearchby,
      togetloadnstbalancedatas$:togetloadnstbalancedatas$,
      toupdateBPassif$:toupdateBPassif$,
      toupdateBS$:toupdateBS$,
      toupdateCH$:toupdateCH$,
      toupdateChgCredit$:toupdateChgCredit$,
      toupdateDS$:toupdateDS$,
      toupdatePrdtDebit$:toupdatePrdtDebit$,
      getallbyid$:getallbyid$
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: index.toinit
};
