
"use strict";
const {olevel} = require('../../omodels/modelsSchema/index').toinit();
const {odaByarg,getodafilter} =require('../../SharedKernel/index').toinit().filtered;
const { Observable } = require('rxjs');
const {togetolevel, getobjolevel,toOlevel,toUpdateolevel}=require('./staticOlevel').toinit();
const {getodaindex$, odaindex,getodaByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svctoapiUpdateInstance,svcodasave$,svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const {concat } = require('rxjs');

const olevelRepository = (function () {

  const index = function (callback) {
    return odaindex(olevel, togetolevel, callback);
  };
  const getolevels$ = function () {
    return getodaindex$(olevel, togetolevel);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(olevel, togetolevel, requestparamid, getobjolevel);
  };
  const toCreateoleveldata$ = function (requestBody,requestparamid) {
    return svctoInitializeInstance$(olevel, requestBody,requestparamid, toOlevel);
  };
  const insertolevel$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateoleveldata$ = function (requestBody,requestparamid) {
    return svctoUpdateInstance$(requestBody,requestparamid, toUpdateolevel, svctoapiUpdateInstance);
  };

  const editolevel$ = function (body, requestparamid) {
    return svcapiupdate$(olevel, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(olevel, body);
  };
  const Deleteolevel$ = function (requestparamid) {
    return svcodaApiDel$(olevel, requestparamid);
  };

  const getolevelsBy$ = function (levelnum) {
    return Observable.create(function (observer) {
      odaindex(olevel, togetolevel, function (err, datas) {
        if (err) {
          observer.next(err);
        } else {
          const filteredObject = getobjolevel(datas, levelnum).odaObject();
          const finalfiltered = getodafilter(datas, odaByarg('id', filteredObject.id));
          observer.next(finalfiltered);
          setTimeout(function () {
            observer.complete();
          }, 100);
        }
      });
    });
  };

  function toinit() {

    return {
      getAll: index,
      getolevels$: getolevels$(),
      getolevelsBy$: getolevelsBy$,
      getByid$:getByid$,
      toCreateoleveldata$:toCreateoleveldata$,
      insertolevel$:insertolevel$,
      toUpdateoleveldata$:toUpdateoleveldata$,
      editolevel$:editolevel$,
      odasearchBy:odasearchBy,
      Deleteolevel$:Deleteolevel$
        };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: olevelRepository.toinit
};
