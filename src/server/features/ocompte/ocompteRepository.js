
"use strict";
const  {oCompte} = require('../../omodels/modelsSchema/index').toinit();
const {togetocompte,toUpdateocompte,getobjOcompte,toOCompte, toInitOcompteInstance}=require('./StaticOcompte').toinit();
const {ocomptedata} = require('../../seed/data-seed/index').toinit();
const { concat } = require('rxjs');
const {getodaindex$, odaindex,getodaByid$}=require('../../sharedkernel/odaservice/dataservices').toinit();
const {svcodasave$, svcodaApiDel$,svcodaSearchBy,svcodaDel$}=require('../../sharedkernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const ocompteRepository = (function () {

  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOcompteInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(oCompte, togetocompte, callback);
  };
  const getocomptes$ = function () {
    return getodaindex$(oCompte, togetocompte);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(oCompte, togetocompte, requestparamid, getobjOcompte);
  };
  const toCreateOComptedata$ = function (requestBody,) {
    return svctoInitCustomInstance$(oCompte, requestBody,toInitializeFinalInstance);
  };
  const insertOCompte$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateOComptedata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateocompte);
  };
  const editOCompte$ = function (body,requestparamid) {
    return svcapiupdate$(oCompte, body,requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oCompte, body);
  };
  const deleteOCompte$ = function (requestparamid) {
    return svcodaApiDel$(oCompte, requestparamid);
  };
  function toinit() {
    return {
      getocomptes$: getocomptes$(),
      getAllocomptes: index,
      getByid$: getByid$,
      toCreateOComptedata$: toCreateOComptedata$,
      insertOCompte$: insertOCompte$,
      toUpdateOComptedata$: toUpdateOComptedata$,
      editOCompte$: editOCompte$,
      odasearchBy: odasearchBy,
      deleteOCompte$: deleteOCompte$
    

    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: ocompteRepository.toinit
};
