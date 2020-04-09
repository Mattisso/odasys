/* eslint-disable semi */

"use strict";

const  {oStableauPoste} = require('../../omodels/modelsSchema/index').toinit();
const {toOstableauposte,togetostableauposte,getobjOstableauposte,toUpdateOstableauposte, toInitOstableauposteInstance}=require('./staticOstableauposte').toinit();
const {getodaindex$, odaindex,getodaByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const ostableauposteRepository = (function () {

  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOstableauposteInstance);
    return data;
  };
  const index = function (callback) {
       return odaindex(oStableauPoste, togetostableauposte, callback);
  };
  const getostableaupostes$ =  function() {
    return  getodaindex$(oStableauPoste, togetostableauposte);
  };

  const getByid$ = function (requestparamid) {
    return getodaByid$(oStableauPoste, togetostableauposte, requestparamid, getobjOstableauposte);

  };
  const toCreateostableaupostedata$ = function (requestBody) {

    return svctoInitCustomInstance$(oStableauPoste, requestBody, toInitializeFinalInstance);
  };
  const insertostableauposte$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateostableaupostedata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateOstableauposte);
  };

  const editostableauposte$ = function (body, requestparamid) {
    return svcapiupdate$(oStableauPoste, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oStableauPoste, body);
  };
  const Deleteostableauposte$ = function (requestparamid) {
    return svcodaApiDel$(oStableauPoste, requestparamid);
  };

  function toinit() {
    return {
      getostableaupostes$: getostableaupostes$(),
      index: index,
      getByid$:getByid$,
      insertostableauposte$:insertostableauposte$,
      toCreateostableaupostedata$:toCreateostableaupostedata$,
      toUpdateostableaupostedata$:toUpdateostableaupostedata$,
      editostableauposte$:editostableauposte$,
      odasearchBy:odasearchBy,
      Deleteostableauposte$:Deleteostableauposte$

    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: ostableauposteRepository.toinit
};

