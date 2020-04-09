"use strict";
var _ = require('lodash');
const {oTableauPoste} = require('../../omodels/modelsSchema/index').toinit();
const {otableaupostedatas} = require('../../seed/data-seed/index').toinit().otableaupostedata;
const {getall}=require('../ostableauposte/index').toinit();
const {toOtableauposte,getobjOtableauposte}=require('./staticOtableauposte').toinit();
const {odaCreateObj,odasave$,odaDel$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const { getobjOstableauposte } = require('../../SharedKernel/staticObjects').toinit();
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 

const {  of, pipe, from, concat, Observable } = require('rxjs');
const { concatMap} = require('rxjs/operators');
var otableauposteSeed = (function () {

  function getseeddata(ArgOne, Argtwo) {
    const arr = [];
    _.forEach(ArgOne, function (seed) {
      var stableauname = _.map(seed.ostableaupostes, 'StableauName');
      const _ostableauposteids = _.map(stableauname, function (ostableauposteids) {
          var validate = getobjOstableauposte(Argtwo, ostableauposteids).odaObject();
          return {
            "_id": validate.OstableauposteKey ? validate.OstableauposteKey : validate.id
          };
        });
      arr.push({
        "TableauName": seed.TableauName,
        "tableauLongName": seed.tableauLongName,
        "ostableauposteids": _ostableauposteids
      });
    });
    return arr;
  }
  const toseedotableaupostedata$ = Observable.create(function (observer) {
    try {
      return getall(function (err, datas) {
        if (err) {
          observer.next(err);
        }
        else {
          const arr=getseeddata(otableaupostedatas,datas);
          const toseedotableaupostedata = toInitializeInstance(oTableauPoste, arr, toOtableauposte);
          observer.next((toseedotableaupostedata));
          setTimeout(() => {
            observer.complete();
          }, 1000);
        }
      });
    }
    catch (err) {
      observer.error(err);
    }
  });
  const _removeotableauposte$ = function(model, item){
    return   svcodaDel$(model,item);
    };
    const removeotableauposte$=_removeotableauposte$(oTableauPoste,'oTableauPoste');

    const _insertotableauposte$ = function(arr) {
      return  svcodasave$(arr);
         };

    const insertoTableauPoste$ = toseedotableaupostedata$.pipe(concatMap(function(x) {
      return _insertotableauposte$(x);
       })
       );

const result$= concat(removeotableauposte$,insertoTableauPoste$);


function toinit() {
  return {
    result$:result$,
    toseedotableaupostedata$:toseedotableaupostedata$,
    getseeddata:getseeddata

  };
}

return {
toinit: toinit
};



}
)();
module.exports= {
toinit:otableauposteSeed.toinit
};


