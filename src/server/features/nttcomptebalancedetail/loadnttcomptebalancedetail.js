'use strict';
// var omodel = require('../../omodels/nttCompteBalanceDetail.js');
//const { ocompterefencedata } = require('../../seed/data-seed/index').toinit();
const {nttCompteBalanceDetail} = require('../../omodels/modelsSchema/index').toinit();
const {toLoadCompteBalanceDetail}=require('./staticNttcomptebalanceDetail').toinit();
const { pipe, concat } = require('rxjs');
const { map, concatMap } = require('rxjs/operators');
const {svctoseedInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { odaremove} = require('../../SharedKernel/odaUtility').toinit();
const {getloadnttcomptebalanceDetaildata$} = require('../nttcomptebalance/nttcomptebalanceRepository').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/index').toinit(); 
const loadnttcomptebalancedetail = (function () {

  const _removeData$ = function (model) {
    return svcodaDel$(model,'nttCompteBalanceDetail');
  };
  const getObserverdata = pipe(
      map(function (n) {
        const filtereddatas = odaremove(n);
        return toInitializeInstance(nttCompteBalanceDetail, filtereddatas, toLoadCompteBalanceDetail);
      })
    );
  const toloadnttcomptebalancedetaildata$ = getObserverdata(getloadnttcomptebalanceDetaildata$);

  const removenttcomptebalancebetail$ = _removeData$(nttCompteBalanceDetail);

  const _insertnttcomptebalancedetail = function (arr) {
    return svcodasave$(arr);
  };
  const insertnttcomptebalancebetail$ = toloadnttcomptebalancedetaildata$.pipe(concatMap(function (x) {
        return _insertnttcomptebalancedetail(x);
      }));
      const loadnttcomptebalancedetail$ = concat(removenttcomptebalancebetail$, insertnttcomptebalancebetail$);

  function toinit() {
    return {
      result$: loadnttcomptebalancedetail$
      ,toloadnttcomptebalancedetaildata$:toloadnttcomptebalancedetaildata$
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: loadnttcomptebalancedetail.toinit
};
