"use strict";
const _ = require('lodash');
const { concatMap } = require('rxjs/operators');
const { nstBalanceInput } = require('../../omodels/modelsSchema/index').toinit();
const { getbalancesheetdata, SourceFileDeleted } = require('./loadbalancesheetData').toinit();
const { combineLatest, Observable, pipe, concat } = require('rxjs');
const {svctoseedInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance} = require('../../SharedKernel/odainstance/toInitializeInstance').toinit();

const {odareomoveInvalidObject} = require('../../SharedKernel/odaUtility').toinit();
const {toBalanceinput, odaqueryselector}=require('./staticNstbalanceinput').toinit();

const LoadNstbalanceinput = (function () {

  const toLoadBalanceinputdata$ = Observable.create(function (observer) {
      try {
        return getbalancesheetdata(function (err, datas) {
          if (err) {
            observer.next(err);
          } else {
            const _datas= odareomoveInvalidObject(datas,odaqueryselector);
            const toLoadBalanceinputdata = toInitializeInstance(nstBalanceInput, _datas, toBalanceinput);
          //  const toLoadBalanceinputdata= odareomoveInvalidObject(_toLoadBalanceinputdata.arrArg,odaqueryselector);
            observer.next(toLoadBalanceinputdata);
            //  console.log(result);
            setTimeout(() => {
              observer.complete();
            }, 100);

          }
        });
      } catch (err) {
        observer.error(err);
      }
    });

  const _removeData$ = function (model, item) {
    return svcodaDel$(model, item);
  };
  const removenstbalanceinput$ = _removeData$(nstBalanceInput, 'nstBalanceInput');

  const _insertnstbalanceinput = function (arr) {
    return svcodasave$(arr);
  };

  const insertnstbalanceinput$ = toLoadBalanceinputdata$.pipe(concatMap(function (x) {
        return _insertnstbalanceinput(x);
      }));

  const loadnstbalanceinput$ = concat(removenstbalanceinput$, insertnstbalanceinput$);

  function toinit() {
    return {
      toLoadBalanceinputdata$: toLoadBalanceinputdata$,
      removenstbalanceinput$: removenstbalanceinput$,
      insertnstbalanceinput$: insertnstbalanceinput$,
      result$: loadnstbalanceinput$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: LoadNstbalanceinput.toinit
};
