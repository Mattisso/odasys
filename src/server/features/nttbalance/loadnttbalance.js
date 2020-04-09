'use strict';
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const _ = require('lodash');
// var omodel = require('../../omodels/nttbalance.js');
//const { ocompterefencedata } = require('../../seed/data-seed/index').toinit();
const {nttBalance} = require('../../omodels/modelsSchema/index').toinit();

const { base, staticObjects, filtered, filteredBy, odaObjects } = require('../../SharedKernel/index').toinit();
const {tonttbalance}=require('./staticNttbalance').toinit();

const { combineLatest, Observable, of, pipe, from, concat } = require('rxjs');
const { filter, map, tap, pluck, find, shareReplay, concatMap } = require('rxjs/operators');
const { svcodaDel$, svcodasave$, svcodaupdate$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {odareomoveInvalidObject,odaremove} = require('../../SharedKernel/odaUtility').toinit();
const { getnstbalances$} = require('../nstbalance/nstbalanceRepository').toinit();
const { toInitializeInstance}=require('../../sharedkernel/odainstance/index').toinit(); 

const loadnttbalance = (function () {

  const _removeData$ = function (model) {
    return svcodaDel$(model,'nttBalance');
  };
  const getObserverdata = pipe(
      map(function (n) {
        const filtereddatas = odaremove(n);
        return toInitializeInstance(nttBalance, filtereddatas, tonttbalance);
      }) // ,
      // ,tap(ev => console.log(ev))
    );
  const toloadnttbalancedata$ = getObserverdata(getnstbalances$);

  const removenttbalance$ = _removeData$(nttBalance);

  const _insertnttbalance = function (arr) {
    return svcodasave$(arr);
  };
  const insertnttbalance$ = toloadnttbalancedata$.pipe(concatMap(function (x) {
    const finalObj =odaremove(x);
        return _insertnttbalance(finalObj);
      }));
      const loadnttbalance$ = concat(removenttbalance$, insertnttbalance$);

  function toinit() {
    return {
      result$: loadnttbalance$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: loadnttbalance.toinit
};
