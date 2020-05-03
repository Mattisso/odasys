"use strict";
const _ = require('lodash');
const  {nstBalance} = require('../../omodels/modelsSchema').toinit();
const { combineLatest, concat,pipe} = require('rxjs');
const { map, shareReplay} = require('rxjs/operators');
const { isValid, removeodauditobj,SelectedDuplicateObject} = require('../../SharedKernel/odaUtility').toinit();
const {getocomptreferences$} = require('../ocomptereference/index').toinit();
const {getObjcomptereference, getobjOreference,getobjOexercCompta,getobjOtableauposte}=require('../../SharedKernel/staticObjects').toinit();
const { getloadnstBalanceinputs$} = require('../nstbalanceinput/index').toinit();
const {togetnstbalance,getobjnstBalance, toUpdatenstbalancedata, tonstbalance, toInitNstbalanceInstance}=require('./staticNstbalance').toinit();
const {toUpdateCH,toUpdateDS, toUpdateBS, toUpdateChgCredit, toUpdatePrdtDebit,toUpdateBPassif}=require('./objQryParams').toinit();
const {getsrdexeccomptas$,getsrdnttbalances$, getsrdoExercices$,getsrdotableaupostes$,getsrdoreferences$}=require('../../sharedkernel/odarepository/sharedRepository').toinit();
const {getodaindex$, odaindex,getodaByid$,getodasharedByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit();

const nstbalanceRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitNstbalanceInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(nstBalance, togetnstbalance, callback);
  };
  const getnstbalances$ = function () {
    return getodaindex$(nstBalance, togetnstbalance);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(nstBalance, togetnstbalance, requestparamid, getobjnstBalance);
  };
  const getcombinedByid$ =function(arr,requestparamid){
return getodasharedByid$(arr,requestparamid,getobjnstBalance);
  };
  const toCreateBalancedata$ = function (requestBody) {
    return  svctoInitCustomInstance$(nstBalance,requestBody, toInitializeFinalInstance);
 };
  const insertnstbalance$ = function (arr) {
    return concat(svcodasave$(arr));
  };
  const toUpdatenstbalancedata$ = function (requestBody) {
return  svctoUpdateInstance$(requestBody,toUpdatenstbalancedata);
     };
  const editnstbalance$ = function (body, requestparamid) {
    return concat(svcapiupdate$(nstBalance, body, requestparamid));
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(nstBalance, body);
  };
  const deletenstbalance$ = function (requestparamid) {
    return svcodaApiDel$(nstBalance, requestparamid);
  };
  const getcombinednIndex$ = combineLatest(getnstbalances$(), getsrdoreferences$, getsrdotableaupostes$, getsrdexeccomptas$).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getnstbalances, getoreferences,getotableaupostes,getAlloexerccompta]) {
        let neobj;
        neobj = _.map(getnstbalances, function (obj) {
            const objoreference = getobjOreference(getoreferences, obj.OreferenceKey).filteredObject();
  const objotableauposte = getobjOtableauposte(getotableaupostes,obj.OtableauposteKey).filteredObject();
  const objoexercompta = getobjOexercCompta(getAlloexerccompta,obj.OexercComptaKey).filteredObject();
            if (isValid(objoreference) === true && isValid(obj)) {
              return _.assign({}, obj, objoreference,objotableauposte,objoexercompta);
            }
          });
        return neobj;
      }), shareReplay(1));

      const getloadnstbalancedatas$ = combineLatest(getloadnstBalanceinputs$, getocomptreferences$, getsrdoExercices$).pipe(
      map(function ([getloadnstbalanceinputs, getocomptreferences, getoexercices]) {
        let neobj;
        neobj = _.map(getloadnstbalanceinputs, function (obj) {
            const objvalidate = getObjcomptereference(getocomptreferences, obj.odacomptenumber).filteredObject();
            const _getoexercice = getoexercices[0];
            const fileteredgetoexercice = _.omit(_getoexercice, removeodauditobj);
            if (isValid(objvalidate) === true && isValid(obj)) {
              return _.assign({}, obj, objvalidate, fileteredgetoexercice);
            }
          });
        return SelectedDuplicateObject('NumCompte', neobj);
      }));

  const updateCH$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdateCH(getnstbalances, getocomptreferences).CHObjectUpDate();
        return filteredData;
      }));
  const updateDS$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdateDS(getnstbalances, getocomptreferences).DSObjectudate();
        return filteredData;
      }));
  const updateBS$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdateBS(getnstbalances, getocomptreferences).BSObjectudate();
        return filteredData;
      }));
  const updateChgCredit$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdateChgCredit(getnstbalances, getocomptreferences).ChgCreditObjectUpdate();
        return filteredData;
      }));
  const updatePrdtDebit$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdatePrdtDebit(getnstbalances, getocomptreferences).PrdtDebitObjectUpdate();
        return filteredData;
      }));
  const updateBPassif$ = combineLatest(getocomptreferences$, getnstbalances$()).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getocomptreferences, getnstbalances]) {
        const filteredData = toUpdateBPassif(getnstbalances, getocomptreferences).BPassifObjectUpdate();
        return filteredData;
      }));
  function toinit() {
    return {
      getnstbalances$: getnstbalances$(),
      index: index,
      getByid$: getByid$,
      getcombinednindex$: getcombinednIndex$,
      getloadnstbalancedatas$: getloadnstbalancedatas$,
      toupdateCHData$: updateCH$,
      toupdateDSData$: updateDS$,
      toupdateBSData$: updateBS$,
      toupdateChgCreditData$: updateChgCredit$,
      toupdatePrdtDebitData$: updatePrdtDebit$,
      toupdateBPassifData$: updateBPassif$,
      getloadnstbalanceinputs$: getloadnstBalanceinputs$,
      insertnstbalance$:insertnstbalance$,
      toUpdatenstbalancedata$:toUpdatenstbalancedata$,
      editnstbalance$:editnstbalance$,
      odasearchBy:odasearchBy,
      deletenstbalance$:deletenstbalance$,
      toCreateBalancedata$:toCreateBalancedata$,
      getcombinedByid$:getcombinedByid$
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: nstbalanceRepository.toinit
};
