/* eslint-disable semi */

"use strict";

const  {oTableauPoste} = require('../../omodels/modelsSchema/index').toinit();
//const { odaExclude} =require('../../SharedKernel/base').toinit();
const {togetotableauposte, getobjOtableauposte,toOtableauposte,toUpdateOstableauposte,totableaupostesNoChifAffair,staticotableauPosteWithcomptebalances,toInitOtableauposteInstance}=require('./staticOtableauposte').toinit();
const {getodaindex$, odaindex,getodaByid$,getodaindexapi$,getodaApiByid$}=require('../../SharedKernel//odaservice/dataservices').toinit();
const {svcodasave$,svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {getsrdcomptebalances$} =require('../../sharedkernel/odarepository/sharedRepository').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const { combineLatest, pipe } = require('rxjs');
const { map } = require('rxjs/operators');

const otableauposteRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOtableauposteInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(oTableauPoste, togetotableauposte, callback);
  };

  const getotableaupostes$ =  function() {
    return getodaindex$(oTableauPoste, togetotableauposte);
  };

  const getoapitableaupostes$ =  function() {
    return getodaindexapi$(oTableauPoste);
  };

const getapiByid$ = function (requestparamid) {
  return getodaApiByid$(oTableauPoste, requestparamid, getobjOtableauposte); 
 };
const toCreateotableaupostedata$ = function (requestBody) {

 return svctoInitCustomInstance$(oTableauPoste, requestBody, toInitializeFinalInstance);
};
const insertotableauposte$ = function (arr) {
 return svcodasave$(arr);
};
const toUpdateotableaupostedata$ = function (requestBody,) {
 return svctoUpdateInstance$(requestBody, toUpdateOstableauposte);
};

const editotableauposte$ = function (body, requestparamid) {
 return svcapiupdate$(oTableauPoste, body, requestparamid);
};
const odasearchBy = function (body) {
 return svcodaSearchBy(oTableauPoste, body);
};
const Deleteotableauposte$ = function (requestparamid) {
 return svcodaApiDel$(oTableauPoste, requestparamid);
};

  const _getotableaupostesNoChifAffair = pipe(
    map(function (n) {
      return totableaupostesNoChifAffair(n);   
    })
  );

  const getotableaupostesChifAffair$ = _getotableaupostesNoChifAffair(getotableaupostes$());

   const DrpotableauPosteWithcomptebalances$ = combineLatest(getoapitableaupostes$(), getsrdcomptebalances$).pipe(
    //  tap(ev => console.log(ev)),
    map(function ([getoapitableaupostes,getcomptebalances]) {
      return staticotableauPosteWithcomptebalances(getcomptebalances,getoapitableaupostes);   
    })
  );
  function toinit() {
    return {
      getotableaupostes$: getoapitableaupostes$(),
      index: index,
      getotableaupostesChifAffair$:getotableaupostesChifAffair$,
      DrpotableauPosteWithcomptebalances$:DrpotableauPosteWithcomptebalances$,
      getByid$:getapiByid$,
      insertotableauposte$:insertotableauposte$,
      toCreateotableauposteedata$:toCreateotableaupostedata$,
      toUpdateotableauposteedata$:toUpdateotableaupostedata$,
      editotableaupostee$:editotableauposte$,
      odasearchBy:odasearchBy,
      Deleteotableaupostee$:Deleteotableauposte$
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: otableauposteRepository.toinit
};

