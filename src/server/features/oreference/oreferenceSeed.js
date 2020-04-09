
"use strict";
const _ = require('lodash');
const { oReference } = require('../../omodels/modelsSchema/index').toinit();
const { oreferencedata } = require('../../seed/data-seed/index').toinit();
// const { combinedSeedata$ } = require('./oreferenceRepository').toinit();
const { getAllocomptes } = require('../ocompte/ocompteRepository').toinit();
const { toOreference } = require('./staticOreference').toinit();
const { getobjOcompte } = require('../../SharedKernel/index').toinit().staticObjects;
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {  Observable, pipe, concat } = require('rxjs');
const { concatMap } = require('rxjs/operators');
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 

const oreferenceSeed = (function () {
  const _oreferencedatas = oreferencedata.oreferencedatas;
  function getseeddata(ArgOne, Argtwo){
    const arr=[];
    _.forEach(ArgOne, function (seed) {
      const numcomptes = _.map(seed.ocomptes, 'CompteNumber');
      const _ocomptekey= _.map(numcomptes, function (numcompte) {
        const  validate= getobjOcompte(Argtwo, numcompte).odaObject();
   //     console.log(ocompteKey);
        return  ({"_id":validate.OcompteKey ? validate.OcompteKey : validate.id});
      });
  arr.push({
    "RefCode": seed.RefCode,
    "Description": seed.Description,
    "ocomptes": _ocomptekey
  });
    });
    return arr;
  }

  const toseedoreferencedata$ = Observable.create(function (observer) {
    let _arr=[];
    try {
      return getAllocomptes(function (err, datas) {
        if (err) {
          observer.next(err);
        }
        else {
          const arr=getseeddata(_oreferencedatas,datas);

  const toseedOexercicedata =  toInitializeInstance(oReference, arr, toOreference);
  observer.next(toseedOexercicedata);
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
  const removeOreference$ = _removeData$(oReference,'oReference');

  const _insertoReference = function (arr) {
    return svcodasave$(arr);
  };

  const insertoReference$ = toseedoreferencedata$.pipe(concatMap(function (x) {
    return _insertoReference(x);
  })
  );

  const seedoReference$ = concat(removeOreference$, insertoReference$);

  function toinit() {
    return {
      result$: seedoReference$,
      toseedoreferencedata$: toseedoreferencedata$
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: oreferenceSeed.toinit
};


