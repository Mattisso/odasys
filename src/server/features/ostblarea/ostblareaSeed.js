"use strict";
var _ = require('lodash');
const { oStblArea } = require('../../omodels/modelsSchema/index').toinit();
const { ostbleareadatas } = require('../../seed/data-seed/index').toinit().ostblareadata;
const { getAllocomptes } = require('../ocompte/ocompteRepository').toinit();
// const {combinedSeedata$}=require('./ostblareaRepository').toinit();
const { toOstblarea } = require('./staticOstblarea').toinit();
const {svctoseedOthersInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { getobjOcompte } = require('../../SharedKernel/index').toinit().staticObjects;

const { Observable, concat } = require('rxjs');
const { filter, map, tap, pluck, find, take, distinct, concatMap } = require('rxjs/operators');
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 

var ostblareaSeed = (function () {


  function getseeddata(ArgOne, Argtwo){
    const arr=[];
    _.forEach(ArgOne, function (seed) {
      var numcomptes = _.map(seed.ocomptes, 'CompteNumber');
      const _ocomptekey= _.map(numcomptes, function (numcompte) {
        const validate = getobjOcompte(Argtwo, numcompte).odaObject();
        return {
          "_id": validate.OcompteKey ? validate.OcompteKey : validate.id
        };
      });
      arr.push({
        "AreaShortName": seed.AreaShortName,
        "AreaLongName": seed.AreaLongName,
        "ocomptes": _ocomptekey
      });
    });
    return arr;
  }
  const toseedostblareadata$ = Observable.create(function (observer) {
    try {
      return getAllocomptes(function (err, datas) {
        if (err) {
          observer.next(err);
        }
        else {
          const arr = getseeddata(ostbleareadatas,datas);
          const toseedOexercicedata = toInitializeInstance(oStblArea, arr, toOstblarea);
          observer.next((toseedOexercicedata));
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

  var _removeData$ = function (model,item) {
    return svcodaDel$(model,item);
  };
  const removeoStblArea$ = _removeData$(oStblArea,'oStblArea');

  const _insertoStblArea$ = function (arr) {
    return svcodasave$(arr);
  };
  const insertoStblArea$ = toseedostblareadata$.pipe(concatMap(function (x) {
    return _insertoStblArea$(x);
  })
  );

  //  const insertoCompte$ = odasave$(toseedarray);
  const seedoStblArea$ = concat(removeoStblArea$, insertoStblArea$);

  function toinit() {
    return {
      result$: seedoStblArea$,
      toseedostblareadata$:toseedostblareadata$,
      getseeddata:getseeddata
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: ostblareaSeed.toinit
};
