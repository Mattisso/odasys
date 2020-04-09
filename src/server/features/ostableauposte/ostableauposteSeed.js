'use strict';
const _ = require('lodash');
const { oStableauPoste } = require('../../omodels/modelsSchema/index').toinit();
const { ostableaupostedatas } = require('../../seed/data-seed/index').toinit().ostableaupostedata;
const {getobjOstblarea} =require('../../SharedKernel/index').toinit().staticObjects;
const { index } = require('../ostblarea/ostblareaRepository').toinit();
const { toOstableauposte } = require('./staticOstableauposte').toinit();
const {svcodasave$, svcodaDel$}=require('../../sharedkernel/odaservice/odaservice').toinit();
const { Observable, concat } = require('rxjs');
const { concatMap } = require('rxjs/operators');
const {toInitializeInstance}=require('../../sharedkernel/odainstance/index').toinit();

var ostableauposteSeed = (function () {

  function getseeddata(ArgOne, Argtwo) {
    const arr = [];
    _.forEach(ArgOne, function (seed) {
      const _ostblareas = _.map(seed.ostblareas, 'AreaShortName');
      const _ostblareaKey = _.map(_ostblareas, function (ostblareaid) {
        const validate = getobjOstblarea(Argtwo, ostblareaid).odaObject();
        return {  "_id": validate.OstblareaKey ? validate.OstblareaKey : validate.id};
      });
      arr.push({
        "StableauName": seed.StableauName,
        "StbleauLongName": seed.StbleauLongName,
        "ostblareaids": _ostblareaKey
      });
    });
    return arr;
  }

  const toseedostableaupostedata$ = Observable.create(function (observer) {
    try {
      return index(function (err, datas) {

        if (err) {
          observer.next(err);
        }
        else {
          const arr = getseeddata(ostableaupostedatas, datas);

          const toseedostableaupostedata = toInitializeInstance(oStableauPoste, arr, toOstableauposte);
          observer.next(toseedostableaupostedata);
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

  var _removeData$ = function (model, item) {
    return svcodaDel$(model,item);
  };
  const removeoStableauposte$ = _removeData$(oStableauPoste,'oStableauPoste');

  const _insertoStableauposte$ = function (arr) {
    return svcodasave$(arr);
  };

  const insertoStableauposte$ = toseedostableaupostedata$.pipe(concatMap(function (x) {
    return _insertoStableauposte$(x);
  })
  );

  const result$ = concat(removeoStableauposte$, insertoStableauposte$);
  function toinit() {
    return {
      result$: result$
      , toseedostableaupostedata$: toseedostableaupostedata$

    };
  }

  return {
    toinit: toinit
  };

}
)();
module.exports = {
  toinit: ostableauposteSeed.toinit
};


