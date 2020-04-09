
'use strict';
// var omodel = require('../../omodels/ocomptereference.js');
//const { ocompterefencedata } = require('../../seed/data-seed/index').toinit();
const {OcompteReference} = require('../../omodels/modelsSchema/index').toinit();

const {toOcomptereference}=require('./staticocomptereference').toinit();
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { pipe, concat } = require('rxjs');
const { map, concatMap } = require('rxjs/operators');
const { odaremove} = require('../../SharedKernel/odaUtility').toinit();
const { getloadocomptereferencedata$ } = require('./ocomptreferenceRepository').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 
const ocomptereferenceSeed = (function () {
  // const seededatas = oarray(ocompterefencedata);

  const _removeData$ = function (model, item) {
    return   svcodaDel$(model,item);
  };

  const getObserverdata = pipe(
    map(function(n){
      const filtereddatas = odaremove(n);
      return toInitializeInstance(OcompteReference,filtereddatas,toOcomptereference);
    })    // ,
    // ,tap(ev => console.log(ev))
  );
  const toseedocomptereferencedata$ = getObserverdata(getloadocomptereferencedata$);

  const removeocomptereference$ = _removeData$(OcompteReference,'OcompteReference');

  const _insertocomptereference = function (arr) {
    return svcodasave$(arr);
  };

  const insertocomptereference$ = toseedocomptereferencedata$.pipe(concatMap(function (x) {
    return _insertocomptereference(x);
  })
  );

  const seedocomptereference$ = concat(removeocomptereference$, insertocomptereference$);

  function toinit() {
    return {
      result$:seedocomptereference$
    };
  }
  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: ocomptereferenceSeed.toinit
};

