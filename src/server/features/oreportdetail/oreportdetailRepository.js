
"use strict";

const { olevel, oReportDetail } = require('../../omodels/modelsSchema/index').toinit();
const { odaByarg, getodafilter } = require('../../SharedKernel/index').toinit().filtered;
const { getObjoreportdetail, togetoreportdetail, toOreportDetail, toUpdateoreportdetail , toInitOreportdetailInstance} = require('./staticOreportdetail').toinit();
const { togetolevel, getobjolevel } = require('../olevel/staticOlevel').toinit();
const { Observable } = require('rxjs');
const { getodaindex$, odaindex, getodaByid$ } = require('../../SharedKernel/odaservice/dataservices').toinit();
const { svcodasave, svcodaApiDel$, svcodaSearchBy } = require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const oreportdetailRepository = (function () {

  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOreportdetailInstance);
    return data;
  };
  const getolevels = function (callback) {
    return odaindex(olevel, togetolevel, callback);
  };

  const index = function (callback) {
    return odaindex(oReportDetail, togetoreportdetail, callback);
  };

  const getreportDetails$ = function () {
    return getodaindex$(oReportDetail, togetoreportdetail);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(oReportDetail, togetoreportdetail, requestparamid, getObjoreportdetail);

  };
  const toCreateoreportdetaildata$ = function (requestBody) {

    return svctoInitCustomInstance$(oReportDetail, requestBody,toInitializeFinalInstance);
  };
  const insertoreportdetail$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateoreportdetaildata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody,requestparamid, toUpdateoreportdetail);
  };

  const editoreportdetail$ = function (body, requestparamid) {
    return svcapiupdate$(oReportDetail, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oReportDetail, body);
  };
  const deleteoreportdetail$ = function (requestparamid) {
    return svcodaApiDel$(oReportDetail, requestparamid);
  };

  const getoreportdetailBy$ = function (levelnum) {
    return Observable.create(function (observer) {
      try {
        return odaindex(oReportDetail, togetoreportdetail, function (err, oreportdetails) {
          if (err) {
            observer.next(err);
          }
          else {
            getolevels(function (err, data) {
              if (err) {
                observer.next(err);
              }
              else {
                const filteredObject = getobjolevel(data, levelnum).odaObject();
                let filtereddata = getodafilter(oreportdetails, odaByarg('olevelKey', filteredObject.id));
                observer.next(filtereddata);
                setTimeout(() => {
                  observer.complete();
                }, 100);
              }

            });
          }

        });

      }
      catch (err) {
        observer.error(err);
      }

    });
  };

  function toinit() {
    return {
      getreportDetails$: getreportDetails$(),
      getoreportdetailBy$: getoreportdetailBy$,
      getAll: index,
      getByid$:getByid$,
      toCreateoreportdetaildata$:toCreateoreportdetaildata$,
      Insertoreportdetail$:insertoreportdetail$,
      toUpdateoreportdetaildata$:toUpdateoreportdetaildata$,
      editoreportdetail$:editoreportdetail$,
      odasearchBy:odasearchBy,
      Deleteoreportdetail$:deleteoreportdetail$
    };
  }

  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: oreportdetailRepository.toinit
};

