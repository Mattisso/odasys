
"use strict";
const  {nttCompteBalanceDetail} = require('../../omodels/modelsSchema/index').toinit();
const {togetnttcomptebalancedetail,getobjnttcomptebalanceDetail,toUpdateCompteBalanceDetail,toCompteBalanceDetail}=require('./staticNttcomptebalanceDetail').toinit();
const {getodaindex$, odaindex,getodaByid$,toapiOdaChildCreate$,toOdaChildUpdate$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svctoapiupdatecomptabalanceDetailsInstance,svctoapiInitcomptabalanceDetailsInstance,svcodaApisave$,svcodaApiupdate$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance, svctoInitializeInstance$,svctoUpdateInstance$}=require('../../sharedkernel/odainstance/index').toinit();
const nttcomptebalancedetailRepository = (function () {
  const index = function (callback) {
    return odaindex(nttCompteBalanceDetail, togetnttcomptebalancedetail, callback);
  };
  const getcompteBalancedetails$ = function () {
    return getodaindex$(nttCompteBalanceDetail, togetnttcomptebalancedetail);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(nttCompteBalanceDetail, togetnttcomptebalancedetail, requestparamid, getobjnttcomptebalanceDetail);
  };
  const toCreateCompteBalanceDetaildata$ = function (requestBody,requestparamid) {
    return toapiOdaChildCreate$(nttCompteBalanceDetail, requestBody,requestparamid, toCompteBalanceDetail, svctoapiInitcomptabalanceDetailsInstance);
  };
  const insertCompteBalanceDetail$ = function (arr) {
    return svcodaApisave$(arr);
  };
  const toUpdateCompteBalanceDetaildata$ = function (requestBody,requestparamid) {
    return toOdaChildUpdate$(requestBody,requestparamid, toUpdateCompteBalanceDetail, svctoapiupdatecomptabalanceDetailsInstance);
  };
  const editCompteBalanceDetail$ = function (body, requestparamid) {
    return svcodaApiupdate$(nttCompteBalanceDetail, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(nttCompteBalanceDetail, body);
  };
  const deleteCompteBalanceDetail$ = function (requestparamid) {
    return svcodaApiDel$(nttCompteBalanceDetail, requestparamid);
  };
  
  function toinit() {
    return {
      index: index,
      getcompteBalancedetails$: getcompteBalancedetails$(),
      getByid$: getByid$,
      toCreateCompteBalanceDetaildata$: toCreateCompteBalanceDetaildata$,
      insertCompteBalanceDetail$: insertCompteBalanceDetail$,
      toUpdateCompteBalanceDetaildata$: toUpdateCompteBalanceDetaildata$,
      editCompteBalanceDetail$: editCompteBalanceDetail$,
      odasearchBy: odasearchBy,
      deleteCompteBalanceDetail$: deleteCompteBalanceDetail$
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: nttcomptebalancedetailRepository.toinit
};
