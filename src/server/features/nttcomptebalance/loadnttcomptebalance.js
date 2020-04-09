'use strict';
// var omodel = require('../../omodels/nttCompteBalance.js');
//const { ocompterefencedata } = require('../../seed/data-seed/index').toinit();
const {nttCompteBalance} = require('../../omodels/modelsSchema/index').toinit();

const {tonttcomptebalance}=require('./staticNttcomptebalance').toinit();

const { pipe, concat } = require('rxjs');
const { map, concatMap } = require('rxjs/operators');
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { odaremove} = require('../../SharedKernel/odaUtility').toinit();
const { reducegroupby} = require('../../SharedKernel/odaFiltered').toinit();

const {getloadnttcomptebalanceData$} = require('../nttcomptebalance/nttcomptebalanceRepository').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/index').toinit(); 
const loadnttcomptebalance = (function () {

  const _removeData$ = function (model) {
    return svcodaDel$(model,'nttCompteBalance');
  };
  const getObserverdata = pipe(
      map(function (n) {
        const filtereddatas= reducegroupby(n);
        return toInitializeInstance(nttCompteBalance, filtereddatas, tonttcomptebalance);
      }) // ,
      // ,tap(ev => console.log(ev))
    );
  const toloadnttcomptebalancedata$ = getObserverdata(getloadnttcomptebalanceData$);

  const removenttcomptebalance$ = _removeData$(nttCompteBalance);

  const _insertnttcomptebalance = function (arr) {
    return svcodasave$(arr);
  };
  const insertnttcomptebalance$ = toloadnttcomptebalancedata$.pipe(concatMap(function (x) {
    const finalObj =odaremove(x);
        return _insertnttcomptebalance(finalObj);
      }));
      const loadnttcomptebalance$ = concat(removenttcomptebalance$, insertnttcomptebalance$);

  function toinit() {
    return {
      result$: loadnttcomptebalance$
      ,toloadnttcomptebalancedata$:toloadnttcomptebalancedata$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: loadnttcomptebalance.toinit
};
