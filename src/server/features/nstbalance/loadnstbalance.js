'use strict';
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const _ = require('lodash');
// var omodel = require('../../omodels/nstbalance.js');
//const { ocompterefencedata } = require('../../seed/data-seed/index').toinit();
const {nstBalance} = require('../../omodels/modelsSchema/index').toinit();
const { base, staticObjects, filtered, filteredBy, odaObjects } = require('../../SharedKernel/index').toinit();
const {tonstbalance,queryselector }=require('./staticNstbalance').toinit();
const { combineLatest, Observable, of, pipe, from, concat } = require('rxjs');
const { filter, map, tap, pluck, find, shareReplay, concatMap } = require('rxjs/operators');
const {svcodaDel$, svcodasave$,} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {odaremove} = require('../../SharedKernel/odaUtility').toinit();
 const {getloadnstbalancedatas$, toupdateCHData$,toupdateDSData$, toupdateBSData$, toupdateChgCreditData$, toupdatePrdtDebitData$, toupdateBPassifData$} = require('./nstbalanceRepository').toinit();
 const { toInitializeInstance,svcodaupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 

const loadnstbalance = (function () {
  const _removeData$ = function (model) {
    return svcodaDel$(model, 'nstBalance');
  };
  const getObserverdata = pipe(
      map(function (n) {
        const _filtereddatas = odaremove(n);
        return toInitializeInstance(nstBalance, _filtereddatas, tonstbalance);
      }));
  const toloadnstbalancedata$ = getObserverdata(getloadnstbalancedatas$);

  const removenstbalance$ = _removeData$(nstBalance);

  const _insertnstbalance = function (arr) {
    return svcodasave$(arr);
  };
  const insertnstbalance$ = toloadnstbalancedata$.pipe(concatMap(function(x) {
        return _insertnstbalance(x);
      }));

  function _updateCH(model, option) {
    return svcodaupdate$(model, option);
  }
  const updateCH$ = toupdateCHData$.pipe(concatMap(function (x) {
        return _updateCH(nstBalance, x);
      }));

  function _updateDS(model, option) {
    return svcodaupdate$(model, option);
  }
  const updateDS$ = toupdateDSData$.pipe(concatMap(function (x) {
        return _updateDS(nstBalance, x);
      }));

  function _updateBS(model, option) {
    return svcodaupdate$(model, option);
  }
  const updateBS$ = toupdateBSData$.pipe(concatMap(function (x) {
        return _updateBS(nstBalance, x);
      }));
  function _updateChgCredit(model, arr) {
    return svcodaupdate$(model, arr);
  }
  const updateChgCredit$ = toupdateChgCreditData$.pipe(concatMap(function (x) {
        return _updateChgCredit(nstBalance, x);
      }));
  function _updatePrdtDebit(model, arr) {
    return svcodaupdate$(model, arr);
  }
  const updatePrdtDebit$ = toupdatePrdtDebitData$.pipe(concatMap(function (x) {
        return _updatePrdtDebit(nstBalance, x);
      }));

  function _updateBPassif(model, arr) {
    return svcodaupdate$(model, arr);
  }
  const updateBPassif$ = toupdateBPassifData$.pipe(concatMap(function (x) {
        return _updateBPassif(nstBalance, x);
      }));
  const loadnstbalance$ = concat(removenstbalance$, insertnstbalance$, updateCH$, updateDS$, updateBS$,updateChgCredit$,updatePrdtDebit$,updateBPassif$);
  function toinit() {
    return {
      result$: loadnstbalance$,
      toloadnstbalancedata$: toloadnstbalancedata$
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: loadnstbalance.toinit
};
