"use strict";
const { nttCompteBalance ,nttCompteBalanceDetail} = require('../../omodels/modelsSchema/index').toinit();
const {togetcomptebalances,toUpdatecomptebalancedata, toapinttcomptebalance,togetloadnttbalance,getloadnttcomptebalanceDetaildata, getcombinednIndex,togetcomptebalancesWithDetails,toInitComptebalanceInstance}=require('./staticNttcomptebalance').toinit();
const {toCompteBalanceDetail}=require('../nttcomptebalancedetail/staticNttcomptebalanceDetail').toinit();
const { combineLatest, pipe, concat} = require('rxjs');
const { map, shareReplay } = require('rxjs/operators');
const {getnttbalances$} = require('../nttbalance/nttbalanceRepository').toinit();
const {getObjcomptebalance}=require('../../SharedKernel/staticObjects').toinit();
const {getObserverWithShareReplaydata$}=require('../../SharedKernel/odaSubscribe').toinit();
const {getodaindex$, odaindex,getodaByid$,toOdaUpdate$,toOdaCreate$,getodasharedByid$,toapiOdaCreate$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svcodaApisave$,svcodaApiupdate$, svcodaApiDel$,svcodaSearchBy, svctoapiInitializeinstance ,svctoapiInitcomptebalanceInstance,svctoapiupdatecomptebalanceInstance}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {getsrdexeccomptas$,getsrdotableaupostes$,getsrdoreferences$,getsrdcomptebalances$,getsrdcomptebalanceDetails$}=require('../../sharedkernel/odarepository/sharedRepository').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$}=require('../../sharedkernel/odainstance/index').toinit(); 


const nttcomptebalanceRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitComptebalanceInstance);
    return data;
  };

  const index = function (callback) {
    return odaindex(nttCompteBalance, togetcomptebalances, callback);
  };
  const getcomptebalances$ = function () {
    return getodaindex$(nttCompteBalance, togetcomptebalances);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(nttCompteBalance, togetcomptebalances, requestparamid, getObjcomptebalance);
  };
  const getcombinedByid$ = function (arr, requestparamid) {
    return getodasharedByid$(arr, requestparamid, getObjcomptebalance);
  };

  const toCreateBalancedata$ = function (requestBody) {
 //   console.log(requestBody);
    return svctoInitCustomInstance$(nttCompteBalance, requestBody, toInitializeFinalInstance);
  };
 /*  const toapiCreateBalancedata$ = function (requestBody) {
    //   console.log(requestBody);
      const _toapiodacreate= svctoInitCustomInstance$(nttCompteBalance, requestBody, toInitializeFinalInstance);
      return getObserverWithShareReplaydata$(_toapiodacreate);
     }; */
 
  const insertcomptebalance$ = function (arr) {
    return concat(svcodaApisave$(arr));
  };
  const toUpdatecomptebalancedata$ = function (requestBody,requestparamid) {
    return toOdaUpdate$(requestBody,requestparamid, toUpdatecomptebalancedata, svctoapiupdatecomptebalanceInstance);
  };
  const editcomptebalance$ = function (body, requestparamid) {
    return concat(svcodaApiupdate$(nttCompteBalance, body, requestparamid));
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(nttCompteBalance, body);
  };
  const deletecomptebalance$ = function (requestparamid) {
    return svcodaApiDel$(nttCompteBalance, requestparamid);
  };

  const getObserverdata = pipe(
      map(function (n) {
        return togetloadnttbalance(n);
      }));
  const getloadnttcomptebalanceData$ = getObserverdata(getnttbalances$);

  const getloadnttcomptebalanceDetaildata$ = combineLatest(getcomptebalances$(), getnttbalances$).pipe(
      map(function ([getcomptebalances, getnttbalances]) {
        return getloadnttcomptebalanceDetaildata(getnttbalances, getcomptebalances);
      }));

  const getcombinednIndex$ = combineLatest(getsrdcomptebalances$, getsrdoreferences$, getsrdotableaupostes$, getsrdexeccomptas$).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getcomptebalances, getoreferences, getotableaupostes, getAlloexerccompta]) {
        return getcombinednIndex(getcomptebalances, getoreferences, getotableaupostes, getAlloexerccompta);
      }), shareReplay(1));
      
  const togetcomptebalancesWithDetails$ = combineLatest(getsrdcomptebalances$, getsrdcomptebalanceDetails$, getsrdoreferences$, getsrdotableaupostes$, getsrdexeccomptas$).pipe(
    map(function ([getsrdcomptebalances, getsrdcomptebalanceDetails,oreferences,otableaupostes,oexerccompta]) {
      return togetcomptebalancesWithDetails(getsrdcomptebalances, getsrdcomptebalanceDetails,oreferences,otableaupostes,oexerccompta);
    }));
  function toinit() {
    return {
      index: index,
      getByid$: getByid$,
      getloadnttcomptebalanceData$: getloadnttcomptebalanceData$,
      getcomptebalances$: getcomptebalances$(),
      getloadnttcomptebalanceDetaildata$: getloadnttcomptebalanceDetaildata$,
      toCreateBalancedata$: toCreateBalancedata$,
      insertcomptebalance$: insertcomptebalance$,
      toUpdatecomptebalancedata$: toUpdatecomptebalancedata$,
      editcomptebalance$: editcomptebalance$,
      odasearchBy: odasearchBy,
      deletecomptebalance$: deletecomptebalance$,
      getcombinednindex$: getcombinednIndex$,
      getcombinedByid$: getcombinedByid$,
      togetcomptebalancesWithDetails$: togetcomptebalancesWithDetails$,
      toInitializeFinalInstance:toInitializeFinalInstance
    //  toapiCreateBalancedata$:toapiCreateBalancedata$

    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: nttcomptebalanceRepository.toinit
};
