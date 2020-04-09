/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

const {getnstbalances$,getloadnstbalancedatas$,getloadnstbalanceinputs$,getByid$,getIndex$,toCreateBalancedata$,toupdateBPassifData$,toUpdatenstbalancedata$,toupdateBSData$,toupdateCHData$,toupdateChgCreditData$,toupdateDSData$,toupdatePrdtDebitData$,odasearchBy,insertnstbalance$,editnstbalance$,deletenstbalance$,index,getcombinedByid$, getcombinednindex$} = require('./nstbalanceRepository').toinit();
const {result$}=require('./loadnstbalance').toinit();
const {getobjnstBalance}=require('./staticNstbalance').toinit();
const { concatMap } = require('rxjs/operators');

const nstbalanceCtrl = (function () {
  const index$ = function () {
    return getnstbalances$;
  };

  const getall = function (callback) {
    return index(callback);
  };
  const nstbalanceload$ = function () {
    return result$;
  };
  const togetloadnstbalancedatas$ = function () {
    return getloadnstbalancedatas$;
  };

  const index$$ = function () {
    return getcombinednindex$;
  };
  const toupdateBPassif$ = function () {
    return toupdateBPassifData$;
  };
  const toupdateBS$ = function () {
    return toupdateBSData$;
  };
  const toupdateCH$ = function () {
    return toupdateCHData$;
  };
  const toupdateDS$ = function () {
    return toupdateDSData$;
  };
  const toupdateChgCredit$ = function () {
    return toupdateChgCreditData$;
  };
  const toupdatePrdtDebit$ = function () {
    return toupdatePrdtDebitData$;
  };
  const getindex$ = function () {
    return getIndex$;
  };
  const getnttbalance$ = function(id) {
return getcombinednindex$.pipe(concatMap(function (x) {
  return getcombinedByid$(x,id);
}));

  };
  const getloadnstBalanceinputs$ = function () {
    return getloadnstbalanceinputs$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };


  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insert$ = function (body) {
    return toCreateBalancedata$(body).pipe(concatMap(function (x) {
        return insertnstbalance$(x);
      }));
  };
  const update$ = function (body, requestparamid) {
    return toUpdatenstbalancedata$(body).pipe(concatMap(function (x) {
        return editnstbalance$(x, requestparamid);
      }));
  };
  const delete$ = function (requestparamid) {
    return deletenstbalance$(requestparamid);
  };
  function toinit() {
    return {
  getall:getall,
   index$: index$(),
   index$$:index$$(),
   getbyid$:getbyid$,
   insert$:insert$,
   odasearchby:odasearchby,
   update$:update$,
   delete$:delete$,
   nstbalanceload$:nstbalanceload$(),
   getloadnstBalanceinputs$:getloadnstBalanceinputs$(),
   togetloadnstbalancedatas$:togetloadnstbalancedatas$(),
   toupdateBPassif$:toupdateBPassif$(),
   toupdateBS$:toupdateBS$(),
   toupdateCH$:toupdateCH$(),
   toupdateDS$:toupdateDS$(),
   toupdateChgCredit$:toupdateChgCredit$(),
   toupdatePrdtDebit$:toupdatePrdtDebit$(),
   getindex$ :getindex$(),
   getallbyid$:getnttbalance$
    };
  }

  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: nstbalanceCtrl.toinit
};
