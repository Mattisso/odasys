"use strict";
const _ = require('lodash');
const async = require('async');
const path = require('path');
const {oReportDetail} = require('../../omodels/modelsSchema/index').toinit();
const {toOreportDetail, getObjoreportdetail}=require('./staticoreportdetail').toinit();
const { combineLatest, Observable, of, pipe, from, concat } = require('rxjs');
const { filter, map, tap, pluck, find, shareReplay, concatMap } = require('rxjs/operators');
const {svctoseedOthersInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { odaremove} = require('../../SharedKernel/odaUtility').toinit();
 const {getseedreportdetaildata$} = require('../../sharedkernel/odarepository/loadRepository').toinit();
 const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 
const orepOrtdetailSeed = (function () {
  const _removeData$ = function (model, item) {
    return   svcodaDel$(model,item);
  };

  const getObserverdata = pipe(
    map(function(n){
     const filtereddatas = odaremove(n);
     return toInitializeInstance(oReportDetail,filtereddatas,toOreportDetail);
    })
  );
  const toseedoreportdetaildata$ = getObserverdata(getseedreportdetaildata$);

  const removeoreportdetail$ = _removeData$(oReportDetail,'oReportDetail');

  const _insertoreportdetail = function (arr) {
    return svcodasave$(arr);
  };

  const insertoreportdetail$ = toseedoreportdetaildata$.pipe(concatMap(function (x) {
    return  _insertoreportdetail(x);
  })
  );

  const seedoreportdetail$ = concat(removeoreportdetail$, insertoreportdetail$);

  function toinit() {
    return {
result$:seedoreportdetail$,
toseedoreportdetaildata$:toseedoreportdetaildata$
    };
  }

return {
  toinit: toinit
};

})();
module.exports= {
toinit:orepOrtdetailSeed.toinit
};


