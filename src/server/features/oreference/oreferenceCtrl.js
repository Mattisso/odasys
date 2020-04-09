/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
"use strict";
const { getAll, getoreferences$, getReferenceByoTableauPostes$,DrpReferenceByoTableauPosteVM$,  getoReferenceLists$,  GetReferenceByYears$,combinedSeedata$,  getByid$,  toCreateoreferencedata$,  toUpdateoreferencedata$,  insertoreference$,  editoreference$,  deleteoreference$,  odasearchBy} = require('./oreferenceRepository').toinit();
const {  result$} = require('./oreferenceSeed').toinit();
const { concatMap} = require('rxjs/operators');
const oreferenceCtrl = (function () {
  const index$ = function () {
    return getoreferences$;
  };
  const seedOreference$ = function () {
    return result$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };
  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const getall = function (callback) {
    return getAll(callback);
  };
  const getreferencebyotableaupostes$ = function () {
    return getReferenceByoTableauPostes$;
  };
  const getoreferenceLists$ = function () {
    return getoReferenceLists$;
  };
  const ddlreferencebyYears$ = function () {
    return GetReferenceByYears$;
  };
  const ddlreferencebyotableauposteVM$ = function () {
    return DrpReferenceByoTableauPosteVM$;
  };
  const combinedseedata$ = function () {
    return combinedSeedata$;
  };
  const insert$ = function (body) {
    return toCreateoreferencedata$(body).pipe(concatMap(function (x) {
        return insertoreference$(x);
      }));
  };
  const update$ = function (body, requestparamid) {
    return toUpdateoreferencedata$(body).pipe(concatMap(function (x) {
        return editoreference$(x, requestparamid);
      }));
  };
  const delete$ = function (requestparamid) {
    return deleteoreference$(requestparamid);
  };
  function toinit() {
    return {
      getall: getall,
      insert$: insert$,
      update$: update$,
      uelete$: delete$,
      getbyid$: getbyid$,
      index$: index$(),
      odasearchby: odasearchby,
      getreferencebyotableaupostes$: getreferencebyotableaupostes$(),
      getoreferenceLists$: getoreferenceLists$(),
      ddlreferencebyYears$: ddlreferencebyYears$(),
      ddlreferencebyotableauposteVM$: ddlreferencebyotableauposteVM$(),
      combinedseedata$: combinedseedata$(),
      seedOreference$: seedOreference$()
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: oreferenceCtrl.toinit
};
