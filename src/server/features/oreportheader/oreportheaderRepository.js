"use strict";
const { oReportHeader } = require('../../omodels/modelsSchema/index').toinit();
const { togetoreportheader,getObjoreportheader,toUpdateoreportheader,toOreportheader, toInitOreportheaderInstance} = require('./staticOreportheader').toinit();
const {getodaindex$, odaindex,getodaByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const oreportheaderRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOreportheaderInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(oReportHeader,togetoreportheader,callback);
  };

  const getreportheaders$ = function () {
    return getodaindex$(oReportHeader, togetoreportheader);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(oReportHeader, togetoreportheader, requestparamid, getObjoreportheader);

  };
  const toCreateoreportheaderdata$ = function (requestBody) {

    return svctoInitCustomInstance$(oReportHeader, requestBody, toInitializeFinalInstance);
  };
  const Insertoreportheader$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateoreportheaderdata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateoreportheader);
  };

  const editoreportheader$ = function (body, requestparamid) {
    return svcapiupdate$(oReportHeader, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oReportHeader, body);
  };
  const Deleteoreportheader$ = function (requestparamid) {
    return svcodaApiDel$(oReportHeader, requestparamid);
  };


  function toinit() {
    return {
      getreportheaders$: getreportheaders$(),
      index: index,
      getByid$:getByid$,
      toCreateoreportheaderdata$:toCreateoreportheaderdata$,
      Insertoreportheader$:Insertoreportheader$,
      editoreportheader$:editoreportheader$,
      odasearchBy:odasearchBy,
      Deleteoreportheader$:Deleteoreportheader$,
      toUpdateoreportheaderdata$:toUpdateoreportheaderdata$

    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: oreportheaderRepository.toinit
};

